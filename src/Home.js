import withRoot from './modules/withRoot';
import React from 'react';
import CommunesPartenaires from './modules/views/CommunesPartenaires';
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
      <CommunesPartenaires />
      <CommentFaire />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
