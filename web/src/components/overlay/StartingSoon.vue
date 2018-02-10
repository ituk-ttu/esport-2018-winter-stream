<template lang="pug">
  div.cont
    h1.title(v-bind:class="$parent.isVisible ? '' : 'out'"): span Jätkame varsti!
    h1.title(v-bind:class="$parent.isVisible ? '' : 'out'"): span {{ $parent.info.startingSoon.text }}

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
  }
  .title {
    transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
    margin: 0 0 75px;
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
    &.out {
      transform: translateY(100px);
      opacity: 0;
    }
  }
</style>
