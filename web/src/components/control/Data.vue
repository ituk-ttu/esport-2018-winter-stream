<template lang="pug">
  .container
    .panel.panel-default
      .panel-heading Starting soon text
      .panel-body
        .form-group
          input.form-control(v-model="data.startingSoon.text")
    .panel.panel-default
      .panel-heading Casters
      .panel-body
        .row
          .col-xs-6
            .form-group
              label.control-label IGN
              input.form-control(v-model="data.casters.left.name")
            .form-group
              label.control-label Info
              input.form-control(v-model="data.casters.left.nick")
          .col-xs-6
            .form-group
              label.control-label IGN
              input.form-control(v-model="data.casters.right.name")
          .col-xs-6
            .form-group
              label.control-label Info
              input.form-control(v-model="data.casters.right.nick")
    .panel.panel-default
      .panel-heading Team text
      .panel-body
        .form-group
          input.form-control(v-model="data.teams.text")
    .row
      .col-xs-12.col-sm-5
        .panel.panel-default
          .panel-heading Left Team
          .panel-body
            .form-group
              select.form-control(v-model="data.teams.left")
                option(v-bind:value="nullTeam") NULL
                option(v-for="team in teams" v-bind:value="team") {{team.name}}
      .col-xs-12.col-sm-2
        button.btn.btn-primary.btn-block.btn-lg(v-on:click="swapTeams()") Swap
        button.btn.btn-default.btn-block.btn-sm(v-on:click="updateTeams()") Update list
      .col-xs-12.col-sm-5
        .panel.panel-default
          .panel-heading Right Team
          .panel-body
            .form-group
              select.form-control(v-model="data.teams.right")
                option(v-bind:value="nullTeam") NULL
                option(v-for="team in teams" v-bind:value="team") {{team.name}}
    .row
      .col-xs-12.col-sm-4
        .panel.panel-default
          .panel-heading Map 1
          .panel-body
            .form-group
              label.control-label Map name
              select.map-button.form-control(v-model="data.maps[0].map")
                option(value="UNKNOWN") UNKNOWN
                option(v-for="map in availableMaps" v-bind:value="map") {{ map }}
              //button.map-button.btn.btn-lg(v-bind:class="isFocused(0) ? 'btn-success' : 'btn-danger'",
              //v-on:click="isFocused(0) ? focus(null) : focus(0)") Focus
              label.control-label Who selected?
              select.map-button.form-control(v-model="data.maps[0].selectedBy")
                option(value="left") Left
                option(value="right") Right
              label.control-label Text
              input.form-control.map-button(v-model="data.maps[0].text")
      .col-xs-12.col-sm-4
        .panel.panel-default
          .panel-heading Map 2
          .panel-body
            .form-group
              label.control-label Map name
              select.map-button.form-control(v-model="data.maps[1].map")
                option(value="UNKNOWN") UNKNOWN
                option(v-for="map in availableMaps" v-bind:value="map") {{ map }}
              //button.map-button.btn.btn-lg(v-bind:class="isFocused(1) ? 'btn-success' : 'btn-danger'",
              //v-on:click="isFocused(1) ? focus(null) : focus(1)") Focus
              label.control-label Who selected?
              select.map-button.form-control(v-model="data.maps[1].selectedBy")
                option(value="left") Left
                option(value="right") Right
              label.control-label Text
              input.form-control.map-button(v-model="data.maps[1].text")
      .col-xs-12.col-sm-4
        .panel.panel-default
          .panel-heading Map 3
          .panel-body
            .form-group
              label.control-label Map name
              select.map-button.form-control(v-model="data.maps[2].map")
                option(value="UNKNOWN") UNKNOWN
                option(v-for="map in availableMaps" v-bind:value="map") {{ map }}
              //button.map-button.btn.btn-lg(v-bind:class="isFocused(2) ? 'btn-success' : 'btn-danger'",
              //v-on:click="isFocused(2) ? focus(null) : focus(2)") Focus
              label.control-label Who selected?
              select.map-button.form-control(v-model="data.maps[2].selectedBy")
                option(value="left") Left
                option(value="right") Right
              label.control-label Text
              input.form-control.map-button(v-model="data.maps[2].text")
    .form-group
      button.btn.btn-success.btn-lg(v-on:click="saveData()") SAVE
      button.btn.btn-danger.btn-lg(v-on:click="reset()") RESET
</template>

<script>
  export default {
    name: 'Data',
    mounted: function () {
      this.$socket.emit('getData');
      this.$socket.emit('getTeams');
    },
    data () {
      return {
        availableMaps: ['Cache', 'Cobblestone', 'Inferno', 'Mirage', 'Nuke', 'Overpass', 'Train'],
        data: null,
        teams: [],
        nullTeam: {
          "id": "???",
          "name": "???",
          "logo": null
        }
      };
    },
    sockets: {
      data: function (data) {
        this.data = data;
      },
      teams: function (teams) {
        this.teams = teams;
        this.$forceUpdate();
      }
    },
    methods: {
      saveData: function (scene) {
        this.$socket.emit('setData', this.data);
      },
      reset: function () {
        this.$socket.emit('getData');
      },
      updateTeams: function() {
        this.$socket.emit('getTeams');
      },
      swapTeams: function() {
        let temp = this.data.teams.left;
        this.data.teams.right = this.data.teams.left;
        this.data.teams.left = temp;
      }
    }
  };
</script>

<style scoped lang="less">
  .container {
    padding-top: 20px;
    height: 100%;
  }
</style>
