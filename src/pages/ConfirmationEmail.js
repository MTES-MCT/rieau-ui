import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import compose from 'utils/compose';
import withRoot from 'theme/withRoot';
import { Link } from '@material-ui/core';
import auth from 'utils/auth';

const typesConfirmations = [
  {
    type: 'reset',
    message: 'Votre demande de réinitialisation de compte est confirmée.'
  },
  {
    type: 'register',
    message: 'Votre création de compte est validée.'
  },
  {
    type: 'error',
    message: ''
  }
];

function confirmationMessage(type) {
  return typesConfirmations.find(tc => type === tc.type).message;
}

function actionLink(type) {
  let action = null;
  switch (type) {
    case 'register':
      action = { nom: 'Connectez-vous', path: '/connexion' };
      break;
    case 'reset':
      action = {
        nom: 'Changez votre mot de passe',
        path: '/changermotdepasse'
      };
      break;
    default:
      action = null;
  }
  return action;
}

function EmailLink(props) {
  const { type, token } = props;
  const action = actionLink(type);
  if (action) {
    var path = action.path;
    if (type === 'reset') path += '/' + token;
  }
  return (
    <React.Fragment>
      {action && (
        <Link
          to={path}
          color="secondary"
          component={RouterLink}
          data-cy="action-link"
        >
          {action.nom}
        </Link>
      )}
    </React.Fragment>
  );
}
EmailLink.propTypes = {
  type: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

function Message(props) {
  const { type, message, token } = props;
  const header =
    type !== 'error' ? 'Confirmation email' : '404 | Page non trouvée';
  return (
    <React.Fragment>
      <Typography variant="h3" marked="center" align="center">
        {header}
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        marked="center"
        align="center"
      >
        {message} <EmailLink type={type} token={token} />
      </Typography>
    </React.Fragment>
  );
}
Message.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

class ConfirmationEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      type: null
    };
  }
  componentDidMount() {
    const { token } = this.props.match.params;
    auth.confirm(token).then(
      confirmation => {
        this.setState(() => ({
          message: confirmationMessage(confirmation.type),
          type: confirmation.type
        }));
      },
      error => {
        this.setState(() => ({
          message: confirmationMessage('error'),
          type: 'error'
        }));
      }
    );
  }

  render() {
    const { message, type } = this.state;
    const { token } = this.props.match.params;
    return (
      <React.Fragment>
        <AppAppBar />
        {type && <Message type={type} message={message} token={token} />}
        <AppFooter />
      </React.Fragment>
    );
  }
}
ConfirmationEmail.propTypes = {
  match: PropTypes.object.isRequired
};
export default compose(withRoot)(ConfirmationEmail);
