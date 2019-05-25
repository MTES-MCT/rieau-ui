import React from 'react';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';

function NotFound({ location }) {
  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" gutterBottom marked="center" align="center">
        404 | Page non trouvée
      </Typography>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(NotFound);
