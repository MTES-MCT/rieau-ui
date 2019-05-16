import withRoot from './modules/withRoot';
import React from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import Valeur from './modules/views/Valeur';
import CommentFaire from './modules/views/CommentFaire';
import AppAppBar from './modules/views/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <Valeur />
      <CommentFaire />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
