import Vue from 'vue';
import Router from 'vue-router';
import Control from '@/components/Control';
import Switcher from '@/components/control/Switcher';
import Overlay from '@/components/Overlay';
import Casters from '@/components/overlay/Casters';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/control',
      component: Control,
      children: [
        {
          path: 'switcher',
          name: 'Switcher',
          component: Switcher
        }
      ]
    },
    {
      path: '/overlay/:scene',
      component: Overlay,
      children: [
        {
          path: 'casters',
          name: 'Casters',
          component: Casters
        }
      ]
    }
  ]
});
