import React, { lazy, Suspense } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import withRoot from '../../theme/withRoot';
import Typography from '../../components/Typography';
import AppAppBar from '../../components/AppAppBar';
import AppFooter from '../../components/AppFooter';
import { importMDX } from 'mdx.macro';

const Cgu = lazy(() => importMDX('./cgu.mdx'));

function Help() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            CGU
          </Typography>
          <Suspense fallback={<div>Chragement en cours...</div>}>
            <Cgu />
          </Suspense>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Help);
