<template lang="pug">
  .bo1-view.maps-view
    .maps
      .map(v-bind:class="$parent.isVisible ? '' : 'out'").map-1
        img.map-img(v-bind:src="'/static/maps/' + toLowerCase($parent.info.maps[0].map) + '.png'" v-bind:class="$parent.isVisible ? '' : 'out'")
        .map-misc-container
          img(src="../../assets/overlay/big-map-misc.svg")
          p.map-name {{$parent.info.maps[0].map}}
        .map-text-container
          img(src="../../assets/overlay/big-map-name.svg")
          p.map-name {{$parent.info.maps[0].text}}
      .map(v-bind:class="$parent.isVisible ? '' : 'out'").map-2
        img.map-img(v-bind:src="'/static/maps/' + toLowerCase($parent.info.maps[1].map) + '.png'" v-bind:class="$parent.isVisible ? '' : 'out'")
        .map-misc-container
          img(src="../../assets/overlay/big-map-misc.svg")
          p.map-name {{$parent.info.maps[1].map}}
        .map-text-container
          img(src="../../assets/overlay/big-map-name.svg")
          p.map-name {{$parent.info.maps[1].text}}
      .map(v-bind:class="$parent.isVisible ? '' : 'out'").map-3
        img.map-img(v-bind:src="'/static/maps/' + toLowerCase($parent.info.maps[2].map) + '.png'" v-bind:class="$parent.isVisible ? '' : 'out'")
        .map-misc-container
          img(src="../../assets/overlay/big-map-misc.svg")
          p.map-name {{$parent.info.maps[2].map}}
        .map-text-container
          img(src="../../assets/overlay/big-map-name.svg")
          p.map-name {{$parent.info.maps[2].text}}
</template>

<script>
  export default {
    name: 'MapsBO3',
    methods: {
      toLowerCase: function (text) {
        return text.toLowerCase();
      }
    }
  };
</script>

<style lang="less" scoped>
  p {
    margin: 0;
    font-family: 'Lato Black', sans-serif;
    font-style: italic;
    font-weight: 700;
    text-transform: uppercase;
  }
  .maps-view {
    height: 100%;
    text-align: center;
    width: 1920px;
    display:flex;
    justify-content:center;
    align-items:center;
    .maps {
      padding-top: 300px;
      .map {
        margin-left: 25px;
        margin-right: 25px;
        display: inline-block;
        &.map-2 {
          transition-delay: 100ms;
        }
        &.map-3 {
          transition-delay: 200ms;
        }
        transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
        width: 518px;
        &.out {
          transform: translateY(900px);
        }
        .map-img {
          position: relative;
          top: 0;
          left: 0;
          width: 512px;
          height: 512px;
          border: 3px solid white;
        }
        .map-misc-container {
          position: relative;
          top: 18px;
          img {
            width: 320px;
            margin-right: auto;
            margin-left: auto;
          }
          p {
            position: relative;
            top: -35px;
            background: -webkit-linear-gradient(45deg, #333, #000);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 23px;
          }
        }
        .map-text-container {
          position: relative;
          top: -113px;
          img {
            width: 476px;
            margin-right: auto;
            margin-left: auto;
          }
          p {
            position: relative;
            top: -64px;
            background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 42px;
          }
        }
      }
    }
  }
</style>
