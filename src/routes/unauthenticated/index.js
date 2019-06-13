import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import CityIcon from '@material-ui/icons/LocationCity';
import SignInIcon from '@material-ui/icons/Lock';
import AideIcon from '@material-ui/icons/Help';
import Home from 'pages/Home';
import Localiser from 'pages/Localiser';
import Communes from 'pages/Communes';
import Connexion from 'pages/Connexion';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';
import Inscription from 'pages/Inscription';
import MotDePasseOublie from 'pages/MotDePasseOublie';

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
    id: 'localiser',
    path: '/localiser',
    label: 'Localiser',
    icon: MapIcon,
    component: Localiser,
    sidebar: true
  },
  {
    id: 'communes',
    path: '/communes',
    label: 'Communes',
    icon: CityIcon,
    component: Communes,
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
  },
  {
    id: 'inscrire',
    path: '/inscrire',
    label: 'Inscription',
    icon: null,
    component: Inscription,
    sidebar: false
  },
  {
    id: 'reinitialiser',
    path: '/reinitialiser',
    label: 'Réinitiliser',
    icon: null,
    component: MotDePasseOublie,
    sidebar: false
  },
  {
    id: 'connexion',
    path: '/connexion',
    label: 'Connexion',
    icon: SignInIcon,
    component: Connexion,
    sidebar: true,
    auth: true
  }
];

export default routes;
