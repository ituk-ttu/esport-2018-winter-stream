import Vue from 'vue';
import Router from 'vue-router';
import Control from '@/components/Control';
import Switcher from '@/components/control/Switcher';
import Data from '@/components/control/Data';
import Overlay from '@/components/Overlay';
import Casters from '@/components/overlay/Casters';
import Group from '@/components/overlay/Group';
import StartingSoon from '@/components/overlay/StartingSoon';
import Playoffs from '@/components/overlay/Playoffs';
import MapsBO1 from '@/components/overlay/MapsBO1';
import MapsBO3 from '@/components/overlay/MapsBO3';
import Teams from '@/components/overlay/Teams';
import LogoCarousel from '@/components/overlay/LogoCarousel';

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
        },
        {
          path: 'mapsBO3',
          name: 'MapsBO3',
          component: MapsBO3
        },
        {
          path: 'playoffs',
          name: 'Playoffs',
          component: Playoffs
        },
        {
          path: 'teams',
          name: 'Teams',
          component: Teams
        },
        {
          path: 'logoCarousel',
          name: 'LogoCarousel',
          component: LogoCarousel
        }
      ]
    }
  ]
});
