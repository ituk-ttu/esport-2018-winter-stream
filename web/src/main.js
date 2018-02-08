// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, process.env.SOCKET_SERVER);

Vue.config.productionTip = false;

Vue.config.errorHandler = (err, vm, info) => {
  console.error({err, vm, info});
};

Vue.config.warnHandler = (err, vm, info) => {
  console.warn({err, vm, info});
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
