<template lang="pug">
  div.group(v-bind:class="$parent.isVisible ? '' : 'out'")
    h1.title: span Grupp A
    div.team
      div.name: span Tiim X
      div.score: span 12
    div.team
      div.name: span Boom eSports
      div.score: span 9
    div.team.looser
      div.name: span Võib-olla
      div.score: span 6
    div.team.looser
      div.name: span Grupist koitsa
      div.score: span 0

</template>

<script>
  export default {
    name: 'Group'
  };
</script>

<style lang="less" scoped>
  .group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    text-transform: uppercase;
    &.out {
      .title, .team {
        transform: translateY(100px);
        opacity: 0;
        transition-delay: 500ms;
      }
      @iterations: 5;
      .teams-loop (@i) when (@i > 0) {
        .team:nth-of-type(@{i}) {
          transition-delay: (500ms - @i * 100ms);
        }
        .teams-loop(@i - 1);
      }
      .teams-loop (@iterations);
    }
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
  }
  .team {
    transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
    margin: 0 0 40px;
    height: 75px;
    line-height: 45px;
    display: flex;
    font-size: 30px;
    .name {
      font-weight: 900;
      width: 608.3px;
      padding: 15px;
      box-sizing: border-box;
      line-height: 45px;
      text-align: center;
      background-image: url('../../assets/overlay/groups/team.svg');
      span {
        background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &.looser .name {
      background-image: url('../../assets/overlay/groups/team-black.svg');
    }
    .score {
      font-weight: 900;
      margin-left: -24px;
      text-align: center;
      padding: 15px;
      width: 119.7px;
      line-height: 45px;
      background: url('../../assets/overlay/groups/score.svg') no-repeat center;
      span {
        background: -webkit-linear-gradient(45deg, #333, #000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
</style>
