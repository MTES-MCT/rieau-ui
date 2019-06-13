import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import NotFound from 'pages/NotFound';
import routes from 'routes/unauthenticated';

function Routes() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {routes
          .filter(route => !route.protected)
          .map((route, key) => {
            return (
              <Route
                key={key}
                exact={route.path === '/'}
                path={route.path}
                component={route.component}
              />
            );
          })}
        <Redirect path="/moncompte" to="/" />
        <NotFound default />
      </Switch>
    </Router>
  );
}

function UnauthenticatedApp() {
  return <Routes />;
}

export default UnauthenticatedApp;
