<template lang="pug">
  div
    .caster.caster-left(v-bind:class="$parent.isVisible ? '' : 'out'")
      .caster-info-container
        img.caster-bottom(src="../../assets/overlay/caster-left-bottom.svg")
        .caster-info-wrapper
          p.caster-info {{ $parent.info.casters.left.nick }}
      .caster-name-container
        img.caster-top(src="../../assets/overlay/caster-left-top.svg")
        .caster-name-wrapper
          p.caster-name {{ $parent.info.casters.left.name }}
    .caster.caster-right(v-bind:class="$parent.isVisible ? '' : 'out'")
      .caster-info-container
        img.caster-bottom(src="../../assets/overlay/caster-right-bottom.svg")
        .caster-info-wrapper
          p.caster-info {{ $parent.info.casters.right.nick }}
      .caster-name-container
        img.caster-top(src="../../assets/overlay/caster-right-top.svg")
        .caster-name-wrapper
          p.caster-name {{ $parent.info.casters.right.name }}
</template>

<script>
  export default {
    name: 'Casters',
    props: ['info']
  };
</script>

<style lang="less" scoped>
  p {
    font-family: 'Lato', sans-serif;
    font-style: italic;
    font-weight: 700;
    text-transform: uppercase;
  }
  .caster {
    display: block;
    position: absolute;
    top: 850px;
    .caster-top {
      position: absolute;
      top: 0;
      width: 690px;
      height: 120px;
    }
    .caster-bottom {
      position: absolute;
      top: 110px;
      width: 610px;
      height: 60px;
    }
    .caster-name-wrapper {
      position: absolute;
      text-align: center;
      top: 12px;
      width: 610px;
      font-size: 66px;
      p {

      }
    }
    .caster-info-wrapper {
      position: absolute;
      text-align: center;
      top: 123px;
      width: 610px;
      font-size: 30px;
    }
    &.caster-left {
      &.out {
        .caster-name-container {
          transform: translateX(-800px);
          transition-delay: 100ms;
        }
        .caster-info-container {
          transform: translateX(-800px);
          transition-delay: 0ms;
        }
      }
      .caster-name-container {
        transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
      }
      .caster-info-container {
        transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
        transition-delay: 100ms;
      }
      left: 0;
      .caster-bottom, .caster-top {
        left: 0;
      }
      .caster-name-wrapper {
        left: 20px;
        p {
          background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .caster-info-wrapper {
        left: 10px;
        p {
          background: -webkit-linear-gradient(45deg, #333, #000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    &.caster-right {
      &.out {
        .caster-name-container {
          transform: translateX(800px);
          transition-delay: 100ms;
        }
        .caster-info-container {
          transform: translateX(800px);
          transition-delay: 0ms;
        }
      }
      .caster-name-container {
        transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
      }
      .caster-info-container {
        transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
        transition-delay: 100ms;
      }
      right: 0;
      .caster-bottom, .caster-top {
        right: 0;
      }
      .caster-name-wrapper {
        right: 20px;
        p {
          background: -webkit-linear-gradient(135deg, #d7d7d7, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .caster-info-wrapper {
        right: 10px;
        p {
          background: -webkit-linear-gradient(135deg, #333, #000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
</style>
