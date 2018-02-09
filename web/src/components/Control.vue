<template lang="pug">
  router-view.control-wrapper
</template>

<script>
  import '../assets/less/style.less';
  export default {
    name: 'Control',
    data () {
      return {
        data: null
      };
    },
    sockets: {
      data: function (data) {
        this.data = data;
      }
    }
  };
</script>
