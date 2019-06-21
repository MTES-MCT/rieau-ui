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

function Routes() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {routesAuthenticated
          .filter(route => route.id !== 'deconnexion')
          .map(route => {
            return (
              <Route
                key={route.id}
                path={route.path}
                component={route.component}
              />
            );
          })}
        <Redirect to="/moncompte">
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
