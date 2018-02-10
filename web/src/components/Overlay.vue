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
        activeGroup: 0,
        playoffs: [],
        activePlayoffGroup: 0
      };
    },
    mounted: function () {
      this.$socket.emit('getData');
      this.$socket.emit('getGroups');
      this.$socket.emit('getPlayoffs');
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
        this.activeGroup = activeGroup;
      },
      playoffs: function (playoffs) {
        this.playoffs = playoffs;
      },
      activePlayoffGroup: function (activePlayoffGroup) {
        this.activePlayoffGroup = activePlayoffGroup;
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
  .logo-arvutitark {
    background-image: url('../assets/overlay/logos/arvutitark.svg');
  }
  .logo-msi-gaming {
    background-image: url('../assets/overlay/logos/msi-gaming.png');
  }
  .logo-itt {
    background-image: url('../assets/overlay/logos/ttu-it-teaduskond.png');
  }
  .logo-ituk {
    background-image: url('../assets/overlay/logos/ituk.svg');
  }
  .logo-noctua {
    background-image: url('../assets/overlay/logos/noctua.jpg');
  }
  .logo-roccat {
    background-image: url('../assets/overlay/logos/roccat.png');
  }
  .logo-balsnack {
    background-image: url('../assets/overlay/logos/balsnack.svg');
  }
  .logo-wolt {
    background-image: url('../assets/overlay/logos/u-wolt-m8.png');
  }
  .logo-boom {
    background-image: url('../assets/overlay/logos/boommedia.png');
  }
  .logo-filmiklubi {
    background-image: url('../assets/overlay/logos/filmiklubi.svg');
  }
  .logo-monster {
    background-image: url('../assets/overlay/logos/monster.svg');
  }
  .logo-network-tomorrow {
    background-image: url('../assets/overlay/logos/network-tomorrow.svg');
  }
  .logo-academic-hostel {
    background-image: url('../assets/overlay/logos/academic-hostel.svg');
  }
  .logo-bytelife {
    background-image: url('../assets/overlay/logos/bytelife.png');
  }
  .logo-exit-room {
    background-image: url('../assets/overlay/logos/exit-room.png');
  }
  .logo-iveco {
    background-image: url('../assets/overlay/logos/iveco.png');
  }
  .logo-ye {
    background-image: url('../assets/overlay/logos/ye.png');
  }
  .logo-arvutitark {
    background-image: url('../assets/overlay/logos/arvutitark.svg');
  }
  .logo-msi-gaming {
    background-image: url('../assets/overlay/logos/msi-gaming.png');
  }
  .logo-itt {
    background-image: url('../assets/overlay/logos/ttu-it-teaduskond.png');
  }
  .logo-ituk {
    background-image: url('../assets/overlay/logos/ituk.svg');
  }
  .logo-noctua {
    background-image: url('../assets/overlay/logos/noctua.jpg');
  }
  .logo-roccat {
    background-image: url('../assets/overlay/logos/roccat.png');
  }
  .logo-balsnack {
    background-image: url('../assets/overlay/logos/balsnack.svg');
  }
  .logo-wolt {
    background-image: url('../assets/overlay/logos/u-wolt-m8.png');
  }
  .logo-boom {
    background-image: url('../assets/overlay/logos/boommedia.png');
  }
  .logo-filmiklubi {
    background-image: url('../assets/overlay/logos/filmiklubi.svg');
  }
  .logo-monster {
    background-image: url('../assets/overlay/logos/monster.svg');
  }
  .logo-network-tomorrow {
    background-image: url('../assets/overlay/logos/network-tomorrow.svg');
  }
  .logo-academic-hostel {
    background-image: url('../assets/overlay/logos/academic-hostel.svg');
  }
  .logo-bytelife {
    background-image: url('../assets/overlay/logos/bytelife.png');
  }
  .logo-exit-room {
    background-image: url('../assets/overlay/logos/exit-room.png');
  }
  .logo-iveco {
    background-image: url('../assets/overlay/logos/iveco.png');
  }
  .logo-ye {
    background-image: url('../assets/overlay/logos/ye.png');
  }
</style>
