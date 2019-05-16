import withRoot from './modules/withRoot';
import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import AppAppBar from './modules/views/AppAppBar';
import cgu from './modules/views/cgu.md';
import AppFooter from './modules/views/AppFooter';

function Help() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            CGU
          </Typography>
          <Markdown>{cgu}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Help);
