var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var clk = require("chalk");
var syncRequest = require('sync-request');
var xmlParse = require('xml-parser');
var request = require('request');


var config = JSON.parse(fs.readFileSync("config/config.json"));
var data = JSON.parse(fs.readFileSync("config/data.json"));
var show = false;
var scenes = null;
var teams = null;
var overlays = {};
var transitions = [];
var programScene = null;
var previewScene = null;
updateScenes();
updateTeams();

app.use('/control', express.static(__dirname + '/web/build/control'));
app.use('/overlay', express.static(__dirname + '/web/build/overlay'));

io.on('connection', function (socket) {
    socket.authed = false;
    // FIXME
    socket.authed = true;


    socket.isOverlay = false;
    console.log(clk.green.underline.bold(socket.handshake.address) + clk.green(" has connected"));
    console.log(clk.green('Waiting for authentification...'));
    socket.on('authenticate', function (password) {
        if (password === config.password) {
            socket.authed = true;
            console.log(clk.green('Successfully authenticated'));
            socket.emit('authenticate', true);
        } else {
            console.log(clk.red('Failed to authenticate'));
            socket.emit('authenticate', false);
        }
    });

    socket.on('disconnect', function () {
        if (socket.isOverlay) {
            try {
                for (var i = 0; i < overlays[socket.overlay.scene][socket.overlay.overlay].sockets.length; i++) {
                    if (overlays[socket.overlay.scene][socket.overlay.overlay].sockets[i] === socket.id) {
                        overlays[socket.overlay.scene][socket.overlay.overlay].sockets.splice(i, 1);
                        console.log("overlay lost");
                        break;
                    }
                }
            } catch (ex) {
                console.log("No such overlay");
            }
        }
    });

    socket.on('setVisible', function (view) {
        if (socket.authed) {
            if (visibleViews[view.viewName] !== undefined) {
                visibleViews[view.viewName] = view.visible;
                io.emit('visible', visibleViews);
                console.log(clk.green('Set visibility to ' + view.visible));
            } else {
                console.log(clk.red('View not found'));
            }
        } else {
            console.log(clk.red('Not authed'));
        }
    });

    socket.on('getAll', function () {
        socket.emit('all', {
            program: programScene,
            preview: previewScene,
            scenes: scenes,
            transitions: transitions,
            overlays: overlays
        });
    });

    socket.on('getVisible', function () {
        socket.emit('visible', visibleViews);
    });

    socket.on('setData', function (newValue) {
        if (socket.authed) {
            data = newValue;
            io.emit('data', data);
            console.log(clk.green('Data updated!'));
        } else {
            console.log(clk.red('Not authed'));
        }
    });

    socket.on('setPreview', function (number) {
        if (socket.authed) {
            request('http://' + config.vmixIp + ':8088/api/?function=PreviewInput&input=' + number, function () {
                previewScene = number;
                io.emit('preview', number);
            })
        }
    });

    socket.on('getData', function () {
        socket.emit('data', data);
    });

    socket.on('getTeams', function () {
        socket.emit('teams', teams);
    });

    socket.on('updateTeams', function () {
        updateTeams();
        socket.emit('teams', teams);
    });

    socket.on('saveToFile', function () {
        fs.writeFileSync("config/data.json", JSON.stringify(data));
    });

    socket.on('overlayAvailable', function (data) {
        socket.isOverlay = true;
        socket.overlay = data;
        if (!overlays.hasOwnProperty(data.scene)) {
            overlays[data.scene] = {};
        }
        if (!overlays[data.scene].hasOwnProperty(data.overlay)) {
            overlays[data.scene][data.overlay] = {visible: false, name: data.overlay, sockets: []};
        }
        overlays[data.scene][data.overlay].sockets.push(socket.id);
        console.log("Connected " + data.overlay + " for " + data.scene);
        io.emit('overlays', overlays);
    });

    socket.on('setOverlayVisible', function (data) {
        if (socket.authed) {
            try {
                overlays[data.scene][data.overlay].visible = data.boolean;
                io.emit('overlays', overlays);
            } catch (ex) {
                console.log("No such overlay");
            }
        }
    });

    socket.on('transition', function (transition) {
        if (socket.authed) {
            request('http://' + config.vmixIp + ':8088/api/?function=' + transition.command, function () {
                setTimeout(function () {
                    request('http://' + config.vmixIp + ':8088/API/', function (error, response, body) {
                        previewScene = parsePreview(body);
                        programScene = parseProgram(body);
                        io.emit('preview', previewScene);
                        io.emit('program', programScene);
                    });
                }, parseInt(transition.duration) + 50);
            })
        }
    })
});

http.listen(config.port, function () {
    console.log('listening on *:' + config.port);
});

function updateTeams() {
    teams = JSON.parse(
        syncRequest('GET',
            'https://api.toornament.com/v1/tournaments/' + config.toornamentId + '/participants',
            {
                'headers': {
                    'X-Api-Key': config.toornamentKey
                }
            }
        ).getBody());
}

function updateScenes() {
    request('http://' + config.vmixIp + ':8088/API/', function (error, response, body) {
        scenes = parseScenes(body);
        previewScene = parsePreview(body);
        programScene = parseProgram(body);
        transitions = parseTransitions(body);
    });
}

function parseScenes(xml) {
    var data = xmlParse(xml);
    var list = [];
    data.root.children.forEach(function (child) {
        if (child.name === "inputs") {
            child.children.forEach(function (element) {
                if (element.attributes.title.substring(0, 10) === 'Virtual - ') {
                    element.attributes.title = element.attributes.title.substring(10);
                }
                list.push(element.attributes);
            });
        }
    });
    return list;
}

function parseTransitions(xml) {
    var data = xmlParse(xml);
    var list = [];
    list.push({
        command: "QuickPlay",
        name: "QuickPlay",
        duration: 500
    });
    list.push({
        command: "CutDirect",
        name: "Cut",
        duration: 0
    });
        data.root.children.forEach(function (child) {
        if (child.name === "transitions") {
            for (var i = 0; i < 4; i++) {
                list.push({
                    command: "Transition" + (i + 1),
                    name: child.children[i].attributes.effect,
                    duration: child.children[i].attributes.duration
                });
            }
        }
    });
    return list;
}

function parsePreview(xml) {
    var data = xmlParse(xml);
    var list = [];
    for (const child of data.root.children) {
        if (child.name === "preview") {
            return child.content;
        }
    }
}

function parseProgram(xml) {
    var data = xmlParse(xml);
    var list = [];
    for (const child of data.root.children) {
        if (child.name === "active") {
            return child.content;
        }
    }
}

function sceneHasOverlay(scene, overlay) {
    overlays[scene].forEach(function (element) {
        if (element.name === overlay) {
            return true;
        }
    });
    return false;
}