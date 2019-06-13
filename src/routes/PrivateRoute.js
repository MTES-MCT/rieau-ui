import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import auth from 'utils/auth';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/connexion',
              state: { from: props.path }
            }}
          />
        )
      }
    />
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
