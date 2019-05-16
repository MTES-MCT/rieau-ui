import withRoot from './modules/withRoot';
import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import AppAppBar from './modules/views/AppAppBar';
import faq from './modules/views/faq.md';
import AppFooter from './modules/views/AppFooter';

function Help() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Aide
          </Typography>
          <Markdown>{faq}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Help);
