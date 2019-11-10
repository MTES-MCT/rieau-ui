import React from 'react';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import AppTheme from 'theme/AppTheme';

function NotFound() {
  return (
    <AppTheme>
      <AppAppBar />
      <Typography variant="h3" marked="center" align="center">
        {`404 | Page non trouvée`}
      </Typography>
      <AppFooter />
    </AppTheme>
  );
}

export default NotFound;
