import React, { useState } from 'react';
import withRoot from 'theme/withRoot';
import AppFooter from 'components/AppFooter';
import Hero from './Hero';
import Valeur from './Valeur';
import CommentFaire from './CommentFaire';
import AppAppBar from 'components/AppAppBar';

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
    <React.Fragment>
      <AppAppBar />
      <div onWheel={handleShowRemonter}>
        <Hero />
        <Valeur />
        <CommentFaire showRemonter={showRemonter} />
      </div>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
