import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import routes from 'routes/authenticated';
import NotFound from 'pages/NotFound';

function Routes() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {routes
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
        <Redirect exact path="/" to="/moncompte" />
        <NotFound default />
      </Switch>
    </Router>
  );
}

function AuthenticatedApp() {
  window.console.log('AuthenticatedApp');
  return <Routes />;
}

export default AuthenticatedApp;
