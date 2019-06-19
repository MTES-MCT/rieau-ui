import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import routes from 'routes/unauthenticated';

function Routes() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {routes.map((route, key) => {
          return (
            <Route
              key={key}
              exact={route.path === '/'}
              path={route.path}
              component={route.component}
            />
          );
        })}
        <NotFound default />
      </Switch>
    </Router>
  );
}

function UnauthenticatedApp() {
  return <Routes />;
}

export default UnauthenticatedApp;
