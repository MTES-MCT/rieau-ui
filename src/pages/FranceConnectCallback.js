import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withRoot from 'theme/withRoot';
import { useAuth } from 'context/auth-context';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import AppFooter from 'components/AppFooter';
import AppAppBar from 'components/AppAppBar';

function FranceConnectCallback(props) {
  const { loginCallback } = useAuth();
  const { code, state } = props.match.params;
  var error = '';
  var user = '';
  loginCallback(code, state).then(
    user => {
      return user;
    },
    e => {
      error = e;
    }
  );
  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" marked="center" align="center">
        {error}
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        marked="center"
        align="center"
      >
        {user}
      </Typography>
      <AppFooter />
    </React.Fragment>
  );
}
FranceConnectCallback.propTypes = {
  match: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withRouter
)(FranceConnectCallback);
