import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppTheme from './modules/components/AppTheme';
import Home from './Home';
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword';
import Terms from './Terms'
import Privacy from './Privacy'
import Help from './Help'

function Page() {
  return (
    <AppTheme title="Permis de construire facile" description="Déposer et suivre facilement sa demande d'autorisation d'urbanisme en ligne">
      <Router>
          <Route exact path="/" component={Home} />
          <Route path="/connexion" component={SignIn} />
          <Route path="/inscrire" component={SignUp} />
          <Route path="/reinitialiser" component={ForgotPassword} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/aide" component={Help} />
      </Router>
    </AppTheme>
  );
}

export default Page;
