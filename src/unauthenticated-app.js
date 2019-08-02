import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import NotFound from 'pages/NotFound';
import routesUnauthenticated from 'routes/unauthenticated';
import routesAuthenticated from 'routes/authenticated';
import { env } from 'utils/env-helper';

function Routes() {
  return (
    <Router basename={env('REACT_APP_BASENAME')}>
      <Switch>
        {routesUnauthenticated.map((route, key) => {
          return (
            <Route
              key={key}
              exact={route.path === '/'}
              path={route.path}
              component={route.component}
            />
          );
        })}
        <Redirect to="/">
          {routesAuthenticated.map((route, key) => {
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

function UnauthenticatedApp() {
  return <Routes />;
}

export default UnauthenticatedApp;
