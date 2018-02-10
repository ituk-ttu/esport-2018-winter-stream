<template lang="pug">
  router-view.overlay-wrapper
</template>

<script>
  export default {
    name: 'Overlay',
    data () {
      return {
        overlays: {},
        info: null,
        groups: [],
        activeGroup: 0
      };
    },
    mounted: function () {
      this.$socket.emit('getData');
      this.$socket.emit('getGroups');
      this.$socket.emit('overlayAvailable', {
        scene: this.$route.params.scene,
        overlay: this.$route.name
      });
    },
    sockets: {
      overlays: function (overlays) {
        this.overlays = overlays;
      },
      data: function (data) {
        this.info = data;
      },
      groups: function (groups) {
        this.groups = groups;
      },
      activeGroup: function (activeGroup) {
        console.log(activeGroup);
        this.activeGroup = activeGroup;
      }
    },
    computed: {
      isVisible: function () {
        return this.overlays.hasOwnProperty(this.$route.params.scene) &&
          this.overlays[this.$route.params.scene].hasOwnProperty(this.$route.name) &&
          this.overlays[this.$route.params.scene][this.$route.name].visible;
      }
    }
  };
</script>

<style>
  html, body, #app, .overlay-wrapper {
    width: 1920px;
    height: 1080px;
  }
  body {
    overflow: hidden;
  }
</style>
