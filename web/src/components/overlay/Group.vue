<template lang="pug">
  div.groups
    div.group(v-for="group in $parent.groups"
              v-bind:class="$parent.isVisible && $parent.activeGroup === group.id ? '' : 'out'")
      h1.title: span {{ group.name }}
      div.team(v-for="team in group.teams" v-bind:class="!team.willAdvance && group.finished ? 'loser' : ''")
        div.name: span {{ team.name }}
        div.score: span {{ team.score }}

</template>

<script>
  export default {
    name: 'Group'
  };
</script>

<style lang="less" scoped>
  .groups {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .group {
    position: absolute;
    top: 0;
    left: 0;
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
      .title, .team {
        transform: translateY(100px);
        opacity: 0;
      }
    }
    .title, .team {
      transition-delay: 500ms !important;
    }
    @iterations: 5;
    .teams-loop (@i) when (@i > 0) {
      .team:nth-of-type(@{i}) {
        transition-delay: (500ms - @i * 100ms) !important;
      }
      .teams-loop(@i - 1);
    }
    .teams-loop (@iterations);
  }
  .title {
    transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
    margin: 0 0 75px;
    font-size: 60px;
    font-weight: 700;
    width: 690px;
    height: 120px;
    padding: 20px;
    box-sizing: border-box;
    line-height: 80px;
    text-align: center;
    background-image: url('../../assets/overlay/groups/header.svg');
    span {
      padding: 0 5px;
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
        padding: 0 5px;
        background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &.loser .name {
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
        padding: 0 5px;
        background: -webkit-linear-gradient(45deg, #333, #000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
</style>
