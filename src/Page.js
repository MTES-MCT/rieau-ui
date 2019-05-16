import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppTheme from './modules/components/AppTheme';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Aide from './modules/views/Aide';
import Cgu from './modules/views/Cgu';

function Page() {
  return (
    <AppTheme
      title="Permis de construire facile"
      description="Déposer et suivre facilement sa demande d'autorisation d'urbanisme en ligne"
    >
      <Router basename={process.env.REACT_APP_BASENAME}>
        <Route exact path="/" component={Home} />
        <Route path="/connexion" component={SignIn} />
        <Route path="/inscrire" component={SignUp} />
        <Route path="/reinitialiser" component={ForgotPassword} />
        <Route path="/aide" component={Aide} />
        <Route path="/cgu" component={Cgu} />
      </Router>
    </AppTheme>
  );
}

export default Page;
