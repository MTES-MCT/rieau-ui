import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import routesAuthenticated from 'routes/authenticated';
import routesUnauthenticated from 'routes/unauthenticated';
import NotFound from 'pages/NotFound';
import { env } from 'config/env-helper';
import { useUser } from 'context/user-context';

function Routes() {
  const { isBeta } = useUser();
  return (
    <Router basename={env('REACT_APP_BASENAME')}>
      <Switch>
        {routesAuthenticated
          .filter(
            route =>
              route.id !== 'deconnexion' && (!isBeta ? !route.beta : true)
          )
          .map(route => {
            return (
              <Route
                key={route.id}
                path={route.path}
                component={route.component}
                exact={route.exact ? route.exact : false}
              />
            );
          })}
        <Redirect to="/dossiers">
          {routesUnauthenticated.map((route, key) => {
            return (
              <Route key={key} path={route.path} component={route.component} />
            );
          })}
        </Redirect>
        <NotFound default />
      </Switch>
    </Router>
  );
}

function AuthenticatedApp() {
  return <Routes />;
}

export default AuthenticatedApp;
