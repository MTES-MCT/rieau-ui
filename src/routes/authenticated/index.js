import AccountIcon from '@material-ui/icons/AccountCircle';
import MonCompte from 'pages/protected/MonCompte';
import SignOutIcon from '@material-ui/icons/LockOpen';
import PiecesJointes from 'pages/protected/PiecesJointes';
import Localiser from 'pages/protected/Localiser';
import MapIcon from '@material-ui/icons/Map';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';
import AideIcon from '@material-ui/icons/Help';
import Dossiers from 'pages/protected/Dossiers';
import Dossier from 'pages/protected/Dossiers/Dossier';
import Messages from 'pages/protected/Messages';

const routes = [
  {
    id: 'dossiers',
    path: '/dossiers',
    label: 'Lister',
    icon: SaveAltIcon,
    component: Dossiers,
    sidebar: true,
    exact: true
  },
  {
    id: 'dossier',
    path: '/dossiers/:id',
    label: 'Dossier',
    icon: SaveAltIcon,
    component: Dossier,
    sidebar: false,
    exact: true
  },
  {
    id: 'piecesjointes',
    path: '/dossiers/:dossierId/piecesjointes',
    label: 'Pièces jointes',
    icon: SaveAltIcon,
    component: PiecesJointes,
    sidebar: false
  },
  {
    id: 'messages',
    path: '/dossiers/:dossierId/messages',
    label: 'Messages',
    icon: QuestionAnswerIcon,
    component: Messages,
    sidebar: false
  },
  {
    id: 'localiser',
    path: '/localiser',
    label: 'Localiser',
    icon: MapIcon,
    component: Localiser,
    sidebar: true,
    beta: true
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
