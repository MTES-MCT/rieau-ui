import React from 'react';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';

function NotFound() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" marked="center" align="center">
        {`404 | Page non trouvée`}
      </Typography>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(NotFound);
