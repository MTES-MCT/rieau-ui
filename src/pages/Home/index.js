import React from 'react';
import withRoot from 'theme/withRoot';
import AppFooter from 'components/AppFooter';
import Hero from './Hero';
import Valeur from './Valeur';
import CommentFaire from './CommentFaire';
import AppAppBar from 'components/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Hero />
      <Valeur />
      <CommentFaire />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
