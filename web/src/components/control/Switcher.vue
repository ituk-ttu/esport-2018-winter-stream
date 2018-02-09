<template lang="pug">
  .container.switcher-container
    div.panel-wrapper
      .panel.panel-default.transition-panel
        .panel-heading.text-center Active group
        .panel-body
          .text-center
            button.btn.btn-lg(v-for="group in view.groups"  v-on:click="setActiveGroup(group)"
                              v-bind:class="group.id === view.activeGroup ? 'btn-success' : 'btn-info'")
              | {{ group.name }}
      .panel.panel-default.transition-panel
        .panel-heading.text-center Transition
        .panel-body
          .text-center
            button.btn.btn-info.btn-lg(v-for="transition in view.transitions" v-on:click="makeTransition(transition)")
              | {{ transition.name }}
      .panel.panel-default.switcher-panel
        .panel-heading.text-center Switcher
        .panel-body
          .text-center
            .view-column(v-for="scene in view.scenes" v-if="scene.title.substring(0, 1) != '_'")
              button.btn.btn-block.btn-lg(v-on:click="setPreview(scene)" v-bind:class="getSceneButtonClass(scene)")
                | {{ scene.title }}
              .overlays(v-if="sceneHasOverlays(scene)")
                button.btn.btn-block(v-for="overlay in getSceneOverlays(scene)"
                                     v-bind:class="overlay.visible ? 'btn-success' : 'btn-danger'"
                                     v-on:click="setOverlayVisible(scene, overlay, !overlay.visible)")
                  | {{ overlay.name }}
</template>

<script>
  export default {
    name: 'Switcher',
    mounted: function () {
      this.$socket.emit('getAll');
    },
    data () {
      return {
        view: {
          program: null,
          preview: null,
          scenes: [],
          transitions: [],
          overlays: {},
          groups: [],
          activeGroup: null
        }
      };
    },
    sockets: {
      all: function (all) {
        this.view = all;
      },
      preview: function (number) {
        this.view.preview = number;
      },
      program: function (number) {
        this.view.program = number;
      },
      overlays: function (overlays) {
        this.view.overlays = overlays;
        this.$forceUpdate();
      },
      groups: function (groups) {
        this.view.groups = groups;
        this.$forceUpdate();
      },
      activeGroup: function (activeGroup) {
        this.view.activeGroup = activeGroup;
        this.$forceUpdate();
      }
    },
    methods: {
      setPreview: function (scene) {
        this.$socket.emit('setPreview', scene.number);
      },
      setActiveGroup: function (group) {
        this.$socket.emit('setActiveGroup', group.id);
      },
      getSceneButtonClass: function (scene) {
        if (scene.number === this.view.program) {
          return 'btn-success';
        } else if (scene.number === this.view.preview) {
          return 'btn-primary';
        } else {
          return 'btn-danger';
        }
      },
      makeTransition: function (transition) {
        this.$socket.emit('transition', transition);
      },
      sceneHasOverlays: function (scene) {
        return this.view.overlays.hasOwnProperty(scene.title);
      },
      getSceneOverlays: function (scene) {
        return this.view.overlays[scene.title];
      },
      setOverlayVisible: function (scene, overlay, boolean) {
        this.$socket.emit('setOverlayVisible', {
          scene: scene.title,
          overlay: overlay.name,
          boolean: boolean
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .switcher-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .switcher-panel {
    vertical-align: top;
    .view-column {
      padding: 15px;
      display: inline-block;
      vertical-align: top;
      width: 250px;
      .overlays {
        width: 100%;
        padding: 25px 25px 0;
        .btn {
          margin-bottom: 15px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .transition-panel {
    .btn {
      margin: 10px;
    }
  }
</style>
