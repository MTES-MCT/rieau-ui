import React, { lazy, Suspense } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import { importMDX } from 'mdx.macro';
import AppTheme from 'theme/AppTheme';

const Faq = lazy(() => importMDX('./faq.mdx'));

function Help() {
  return (
    <AppTheme>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Aide
          </Typography>
          <Suspense fallback={<div>Chargement en cours...</div>}>
            <Faq />
          </Suspense>
        </Box>
      </Container>
      <AppFooter />
    </AppTheme>
  );
}

export default Help;
