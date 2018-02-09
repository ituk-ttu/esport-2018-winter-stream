import Vue from 'vue';
import Router from 'vue-router';
import Control from '@/components/Control';
import Switcher from '@/components/control/Switcher';
import Data from '@/components/control/Data';
import Overlay from '@/components/Overlay';
import Casters from '@/components/overlay/Casters';
import Group from '@/components/overlay/Group';

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
        },
        {
          path: 'data',
          name: 'Data',
          component: Data
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
        },
        {
          path: 'group',
          name: 'Group',
          component: Group
        }
      ]
    }
  ]
});
