<template lang="pug">
  div.cont(v-bind:class="$parent.isVisible ? '' : 'out'")
    h1.title: span {{ $parent.info.startingSoon.text }}
    div.sponsor-logos
      .sponsors
        .sponsor-logo.logo-arvutitark
        .sponsor-logo.logo-msi-gaming
        .sponsor-logo.logo-itt
        .sponsor-logo.logo-ituk
      .sponsors-sm
        .sponsor-logo.logo-noctua
        .sponsor-logo.logo-roccat
        .sponsor-logo.logo-balsnack
        .sponsor-logo.logo-wolt
        .sponsor-logo.logo-boom
        .sponsor-logo.logo-filmiklubi
        .sponsor-logo.logo-monster
        .sponsor-logo.logo-network-tomorrow
        .sponsor-logo.logo-academic-hostel
        .sponsor-logo.logo-bytelife
        .sponsor-logo.logo-exit-room
        .sponsor-logo.logo-iveco
        .sponsor-logo.logo-ye
        .sponsor-logo.logo-xgr
</template>

<script>
  export default {
    name: 'StartingSoon'
  };
</script>

<style lang="less" scoped>
  .cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-family: 'Lato Black', sans-serif;
    font-style: italic;
    text-transform: uppercase;
    &.out {
      .title, .sponsors, .sponsors-sm {
        transform: translateY(100px);
        opacity: 0;
      }
    }
  }
  .title {
    transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
    transition-delay: 250ms;
    margin: 80px 0;
    font-size: 60px;
    font-weight: 900;
    width: 690px;
    height: 120px;
    padding: 20px;
    box-sizing: border-box;
    line-height: 80px;
    text-align: center;
    background-image: url('../../assets/overlay/groups/header.svg');
    span {
      background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .sponsor-logos {
    width: 70%;
    margin: 0 15%;
    .sponsors {
      transition-delay: 100ms !important;
    }
    .sponsors, .sponsors-sm {
      transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
    }
    .sponsors .sponsor-logo {
      margin: 40px 0;
      width: 25%;
      height: 20vh;
    }
    .sponsors-sm .sponsor-logo {
      width: 20%;
      height: 10vh;
    }
  }
  .sponsor-logo {
    padding: 20px;
    box-sizing: border-box;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-origin: content-box;
  }
</style>
