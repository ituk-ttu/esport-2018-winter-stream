import Vue from 'vue';
import Router from 'vue-router';
import Control from '@/components/Control';
import Switcher from '@/components/control/Switcher';
import Data from '@/components/control/Data';
import Overlay from '@/components/Overlay';
import Casters from '@/components/overlay/Casters';
import Group from '@/components/overlay/Group';
import StartingSoon from '@/components/overlay/StartingSoon';
import MapsBO1 from '@/components/overlay/MapsBO1';

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
        },
        {
          path: 'startingSoon',
          name: 'StartingSoon',
          component: StartingSoon
        },
        {
          path: 'mapsBO1',
          name: 'MapsBO1',
          component: MapsBO1
        }
      ]
    }
  ]
});
