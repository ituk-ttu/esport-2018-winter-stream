<template lang="pug">
  .groups
    .group(v-for="group in $parent.playoffs"
    v-bind:class="[$parent.isVisible && $parent.activePlayoffGroup === group.id ? '' : 'out', " +
    "group.id === superFinalGroup ? 'superFinal' : '']")
      .round(v-for="round in group.rounds")
        .round-title(v-if="getTitle(group, round) != null") {{ getTitle(group, round) }}
        .round-body
          .match(v-for="match in round.matches")
            .team(v-for="team in match.teams" v-bind:class="match.finished && team.isLoser ? 'loser' : ''")
              .name: span(v-bind:class="team.name == null ? 'tbd' : ''") {{ team.name != null ? team.name : 'TBD'}}
              .score: span {{ showScores(match) ? team.score : ''}}

</template>

<script>
  export default {
    name: 'Playoffs',
    data () {
      return {
        superFinalGroup: 3,
        titles: {
          1: {
            1: '1/8 finaal (BO1)',
            2: 'veerandfinaal (BO3)',
            3: 'poolfinaal (BO3)',
            4: 'finaal (BO3)'
          },
          2: {
            1: 'BO1',
            2: 'BO1',
            3: 'BO1',
            4: 'BO1',
            5: 'BO1',
            6: 'BO3'
          },
          3: {
            1: 'Superfinaal (BO5)'
          }
        }
      };
    },
    methods: {
      showScores: function (match) {
        return match.teams.every(team => team.name != null);
      },
      getTitle: function (group, round) {
        let groupTitles = this.titles[group.id];
        if (groupTitles == null) {
          return null;
        }
        return groupTitles[round.id];
      }
    }
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
    align-items: stretch;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    text-transform: uppercase;
    &.out {
      @iterations: 8;
      .round-out-loop (@i) when (@i > 0) {
        .round:nth-of-type(@{i}) {
          transition-delay: (@i * 100ms) !important;
        }
        .round-out-loop(@i - 1);
      }
      .round-out-loop (@iterations);
      .round {
        transform: translateY(100px);
        opacity: 0;
      }
    }
    @iterations: 8;
    .round-in-loop (@i) when (@i > 0) {
      .round:nth-of-type(@{i}) {
        transition-delay: (500ms + @i * 100ms) !important;
      }
      .round-in-loop(@i - 1);
    }
    .round-in-loop (@iterations);
  }

  .round {
    transition: all 300ms cubic-bezier(0, 0.8, 1, 1);
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-around;
  }

  .round-title {
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 15px 0 20px;
    width: 275px;
    background-image: url('../../assets/overlay/brackets/title_purple.svg');
    span {
      padding: 0 5px;
      background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .round-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
  }

  .team {
    text-align: center;
    margin: 5px 0;
    font-weight: 900;
    display: flex;
  }

  .name {
    height: 45px;
    line-height: 45px;
    width: 225px;
    background-image: url('../../assets/overlay/brackets/regular_team_white.svg');
    span {
      padding: 0 5px;
      background: -webkit-linear-gradient(45deg, #710835, #951049);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      &.tbd {
        opacity: 0.5
      }
    }
  }

  .score {
    height: 39px;
    line-height: 39px;
    margin: 3px 0 3px -14px;
    width: 63px;
    background-image: url('../../assets/overlay/brackets/regular_score_purple.svg');
    span {
      padding: 0 5px;
      background: -webkit-linear-gradient(45deg, #d7d7d7, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .team.loser {
    .name {
      background-image: url('../../assets/overlay/brackets/regular_team_white.svg');
      span {
        padding: 0 5px;
        background: -webkit-linear-gradient(45deg, #333, #000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .score {
      background-image: url('../../assets/overlay/brackets/regular_score_black.svg');
    }
  }

  .superFinal {
    zoom: 300%;
    .round-title {
      margin: 50px 0 0;
    }
  }
</style>
