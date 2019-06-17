import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withRoot from 'theme/withRoot';
import { useAuth } from 'context/auth-context';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import AppFooter from 'components/AppFooter';
import AppAppBar from 'components/AppAppBar';
import queryString from 'query-string';

function FranceConnectCallback(props) {
  const { loginCallback } = useAuth();
  const values = queryString.parse(props.location.search);
  var error = '';
  loginCallback(values.code, values.state).then(
    data => {
      return data;
    },
    e => {
      error = e;
    }
  );
  return (
    <React.Fragment>
      <AppAppBar />
      {error && (
        <React.Fragment>
          <Typography variant="h3" marked="center" align="center">
            {'401 | Utilisateur non authentifié'}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            marked="center"
            align="center"
          >
            {error}
          </Typography>
        </React.Fragment>
      )}
      <AppFooter />
    </React.Fragment>
  );
}
FranceConnectCallback.propTypes = {
  location: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withRouter
)(FranceConnectCallback);
