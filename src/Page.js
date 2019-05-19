import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppTheme from './components/AppTheme';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Aide from './pages/Aide';
import Cgu from './pages/Cgu';
import Localiser from './pages/Localiser';
import Communes from './pages/Communes';

function Page() {
  return (
    <AppTheme
      title="Permis de construire facile"
      description="Déposer et suivre facilement sa demande d'autorisation d'urbanisme en ligne"
    >
      <Router basename={process.env.REACT_APP_BASENAME}>
        <Route exact path="/" component={Home} />
        <Route path="/connexion" component={SignIn} />
        <Route path="/communes" component={Communes} />
        <Route path="/inscrire" component={SignUp} />
        <Route path="/localiser" component={Localiser} />
        <Route path="/reinitialiser" component={ForgotPassword} />
        <Route path="/aide" component={Aide} />
        <Route path="/cgu" component={Cgu} />
      </Router>
    </AppTheme>
  );
}

export default Page;
