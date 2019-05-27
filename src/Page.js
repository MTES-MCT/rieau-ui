import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppTheme from 'components/AppTheme';
import routes from 'routes';
import NotFound from 'pages/NotFound';

function Page() {
  return (
    <AppTheme
      title="Permis de construire facile"
      description="Déposer et suivre facilement sa demande d'autorisation d'urbanisme en ligne"
    >
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
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppTheme>
  );
}

export default Page;
