import AccountIcon from '@material-ui/icons/AccountCircle';
import MonCompte from 'pages/protected/MonCompte';
import SignOutIcon from '@material-ui/icons/LockOpen';
import Deposer from 'pages/protected/Deposer';
import Localiser from 'pages/Localiser';
import Communes from 'pages/Communes';
import MapIcon from '@material-ui/icons/Map';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CityIcon from '@material-ui/icons/LocationCity';

const routes = [
  {
    id: 'deposer',
    path: '/deposer',
    label: 'Pièces',
    icon: SaveAltIcon,
    component: Deposer,
    sidebar: true
  },
  {
    id: 'localiser',
    path: '/localiser',
    label: 'Localisation',
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
    id: 'moncompte',
    path: '/moncompte',
    label: 'Mon compte',
    icon: AccountIcon,
    component: MonCompte,
    sidebar: true,
    auth: true
  },
  {
    id: 'deconnexion',
    label: 'Déconnexion',
    icon: SignOutIcon,
    sidebar: true,
    auth: true
  }
];

export default routes;
