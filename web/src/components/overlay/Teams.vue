<template lang="pug">
  div.stuff(v-bind:class="$parent.isVisible ? '' : 'out'")
    .mid
      img(src="../../assets/overlay/teams/mid.svg")
      p {{$parent.info.teams.text}}
    .team.team-right
      img(src="../../assets/overlay/teams/team.svg")
      p {{$parent.info.teams.right.name}}
    .team.team-left
      img(src="../../assets/overlay/teams/team.svg")
      p {{$parent.info.teams.left.name}}
</template>

<script>
  export default {
    name: 'Teams',
    props: ['info']
  };
</script>

<style lang="less" scoped>
  .stuff {
    transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
    &.out {
      transform: translateY(-250px);
    }
  }
  p {
    font-family: 'Lato Black', sans-serif;
    font-style: italic;
    font-weight: 700;
    text-transform: uppercase;
  }
  .mid {
    position: absolute;
    width: 350px;
    top: 50px;
    left: 785px;
    img {
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      position: absolute;
      top: 15px;
      left: 0;
      width: 350px;
      text-align: center;
      font-size: 50px;
      background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .team {
    width: 495px;
    position: absolute;
    top: 67px;
    &.team-right {
      right: 350px;
    }
    &.team-left {
      left: 350px;
    }
    p {
      width: 100%;
      font-size: 48px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      background: -webkit-linear-gradient(45deg, #333, #000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
