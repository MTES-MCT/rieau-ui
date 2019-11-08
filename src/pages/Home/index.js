import React, { useState } from 'react';
import AppFooter from 'components/AppFooter';
import Hero from './Hero';
import Valeur from './Valeur';
import CommentFaire from './CommentFaire';
import AppAppBar from 'components/AppAppBar';
import AppTheme from 'components/AppTheme';

function Index() {
  const [showRemonter, setShowRemonter] = useState(false);

  function handleShowRemonter(event) {
    if (event.deltaY > 0) {
      setShowRemonter(true);
    } else {
      setShowRemonter(false);
    }
  }
  return (
    <AppTheme>
      <AppAppBar />
      <div onWheel={handleShowRemonter}>
        <Hero />
        <Valeur />
        <CommentFaire showRemonter={showRemonter} />
      </div>
      <AppFooter />
    </AppTheme>
  );
}

export default Index;
