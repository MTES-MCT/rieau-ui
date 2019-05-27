import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import CityIcon from '@material-ui/icons/LocationCity';
import SignInIcon from '@material-ui/icons/Lock';
import AideIcon from '@material-ui/icons/Help';
import Home from 'pages/Home';
import Localiser from 'pages/Localiser';
import Communes from 'pages/Communes';
import SignIn from 'pages/SignIn';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';
import SignUp from 'pages/SignUp';
import ForgotPassword from 'pages/ForgotPassword';

const Routes = [
  {
    path: '/',
    label: 'Accueil',
    icon: HomeIcon,
    component: Home,
    sidebar: true
  },
  {
    path: '/localiser',
    label: 'Localiser',
    icon: MapIcon,
    component: Localiser,
    sidebar: true
  },
  {
    path: '/communes',
    label: 'Communes',
    icon: CityIcon,
    component: Communes,
    sidebar: true
  },
  {
    path: '/connexion',
    label: 'Connexion',
    icon: SignInIcon,
    component: SignIn,
    sidebar: true
  },
  {
    path: '/aide',
    label: 'Aide',
    icon: AideIcon,
    component: Aide,
    sidebar: false
  },
  {
    path: '/cgu',
    label: 'CGU',
    icon: null,
    component: Cgu,
    sidebar: false
  },
  {
    path: '/inscrire',
    label: 'Inscription',
    icon: null,
    component: SignUp,
    sidebar: false
  },
  {
    path: '/reinitialiser',
    label: 'Réinitiliser',
    icon: null,
    component: ForgotPassword,
    sidebar: false
  }
];

export default Routes;
