import HomeIcon from '@material-ui/icons/Home';
import AideIcon from '@material-ui/icons/Help';
import Home from 'pages/Home';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';

const routes = [
  {
    id: 'accueil',
    path: '/',
    label: 'Accueil',
    icon: HomeIcon,
    component: Home,
    sidebar: true
  },
  {
    id: 'aide',
    path: '/aide',
    label: 'Aide',
    icon: AideIcon,
    component: Aide,
    sidebar: false
  },
  {
    id: 'cgu',
    path: '/cgu',
    label: 'CGU',
    icon: null,
    component: Cgu,
    sidebar: false
  }
];

export default routes;
