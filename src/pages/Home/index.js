import React from 'react';
import withRoot from '../../theme/withRoot';
import AppFooter from '../../components/AppFooter';
import ProductHero from './ProductHero';
import Valeur from './Valeur';
import CommentFaire from './CommentFaire';
import AppBar from '../../components/AppBar';

function Index() {
  return (
    <React.Fragment>
      <AppBar />
      <ProductHero />
      <Valeur />
      <CommentFaire />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
