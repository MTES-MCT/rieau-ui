import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import compose from '../utils/compose';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light
  },
  container: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 48,
    margin: theme.spacing(1)
  },
  logo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '160px',
    margin: theme.spacing(1)
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 40,
  },
});

function AppFooter(props) {
  const { classes } = props;

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Grid container direction="column" spacing={1}>
              <Grid item className={classes.icons}>
                <a href="https://github.com/MTES-MCT/permis-construire-facile-ui" className={classes.icon}>
                  <FaGithub />
                </a>
                <a href="https://twitter.com/Min_Territoires" className={classes.icon}>
                  <FaTwitter />
                </a>
              </Grid>
            </Grid>
          </Grid>  
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
            <a href="http://www.cohesion-territoires.gouv.fr/">
              <img src="/static/images/marianne-foot.jpg" className={classes.logo} alt="Ministère de la cohésion des territoires et des relations avec les collectivités territoriales"/>
            </a>
            </Grid>
          </Grid>            
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/terms">Terms</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/privacy">Privacy</Link>
              </li>
            </ul>
            </Grid>
          </Grid>
      </Container>
    </Typography>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  React.memo,
  withStyles(styles),
)(AppFooter);
