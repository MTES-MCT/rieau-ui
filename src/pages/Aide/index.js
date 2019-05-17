import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import withRoot from '../../theme/withRoot';
import Markdown from '../../components/Markdown';
import Typography from '../../components/Typography';
import AppBar from '../../components/AppBar';
import faq from './faq.md';
import AppFooter from '../../components/AppFooter';

function Help() {
  return (
    <React.Fragment>
      <AppBar />
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
