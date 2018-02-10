<template lang="pug">
  div.cont(v-bind:class="$parent.isVisible ? '' : 'out'")
    div.sponsor-logos
      .sponsor-logo.logo-arvutitark
      .sponsor-logo.logo-msi-gaming
      .sponsor-logo.logo-itt
      .sponsor-logo.logo-ituk
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
    name: 'LogoCarousel'
  };
</script>

<style lang="less" scoped>
  .sponsor-logos {
    right: 0;
    bottom: 90px;
    height: 170px;
    width: 282px;
    position: absolute;
  }
  .sponsor-logo {
    right: 0;
    bottom: 0;
    height: 150px;
    width: 250px;
    position: absolute;
    float: left;
    padding: 10px 16px;
    box-sizing: content-box;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-origin: content-box;
  }
  @logos: arvutitark, msi-gaming, itt, ituk, noctua, roccat, balsnack, wolt, boom, filmiklubi, monster,
          network-tomorrow, academic-hostel, bytelife, exit-room, iveco, ye, xgr;
  @still-duration: 1500;
  @fade-duration: 1500;
  @step-duration: (@still-duration + @fade-duration);
  @full-duration: length(@logos) * @step-duration;
  .make-steps(@i) {
    @start-in-step: percentage(mod(@i * @step-duration, @full-duration) / @full-duration);
    @end-in-step: percentage(mod(@i * @step-duration + @fade-duration, @full-duration) / @full-duration);
    @start-out-step: percentage(mod((@i + 1) * @step-duration, @full-duration) / @full-duration);
    @end-out-step: percentage(mod((@i + 1) * @step-duration + @fade-duration, @full-duration) / @full-duration);
    0% {
      & when(@start-out-step < @end-in-step) {
        opacity: 1;
      }
      & when(@end-in-step < @start-out-step) {
        opacity: 0;
      }
    }
    @{start-in-step}{
      opacity: 0;
    }
    @{end-in-step}{
      opacity: 1;
    }
    @{start-out-step}{
      opacity: 1;
    }
    @{end-out-step}{
      opacity: 0;
    }
    100% {
       & when(@start-out-step < @end-in-step) {
         opacity: 1;
       }
       & when(@end-in-step < @start-out-step) {
         opacity: 0;
       }
     }
  }
  .make-all-transitions(@i: 0) when (@i < length(@logos)) {
    @logo: extract(@logos, @i + 1);
    @animation-name: ~"animation-logo-@{logo}";
    @keyframes @animation-name {
      .make-steps(@i);
    }
    @animation: ~"@{animation-name} @{full-duration}ms infinite";
    .logo-@{logo} {
      animation: @animation;
    }
    .make-all-transitions(@i + 1);
  }
  .make-all-transitions();
</style>
