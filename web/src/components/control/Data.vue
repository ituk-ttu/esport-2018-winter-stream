<template lang="pug">
  .container
    .panel.panel-default
      .panel-heading Casters
      .panel-body
        .row
          .col-xs-6
            .form-group
              label.control-label IGN
              input.form-control(v-model="data.casters.left.name")
            .form-group
              label.control-label Info
              input.form-control(v-model="data.casters.left.nick")
          .col-xs-6
            .form-group
              label.control-label IGN
              input.form-control(v-model="data.casters.right.name")
          .col-xs-6
            .form-group
              label.control-label Info
              input.form-control(v-model="data.casters.right.nick")
    .form-group
      button.btn.btn-success.btn-lg(v-on:click="saveData()") SAVE
      button.btn.btn-danger.btn-lg(v-on:click="reset()") RESET
</template>

<script>
  export default {
    name: 'Data',
    mounted: function () {
      this.$socket.emit('getData');
    },
    data () {
      return {
        data: null
      };
    },
    sockets: {
      data: function (data) {
        this.data = data;
      }
    },
    methods: {
      saveData: function (scene) {
        this.$socket.emit('setData', this.data);
      },
      reset: function () {
        this.$socket.emit('getData');
      }
    }
  };
</script>

<style scoped lang="less">
  .container {
    padding-top: 20px;
    height: 100%;
  }
</style>
