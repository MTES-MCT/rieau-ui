import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import Button from './Button';
import compose from 'utils/compose';
import { FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  footer: {
    display: 'flex',
    padding: theme.spacing(6)
  },
  container: {
    display: 'flex'
  },
  icons: {
    display: 'flex'
  },
  terms: {
    display: 'flex'
  },
  icon: {
    fontSize: 24,
    margin: theme.spacing(1),
    '&:hover': {
      transform: 'scale(1.2)'
    }
  },
  button: {
    margin: theme.spacing(1)
  }
});

function AppFooter(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid
            item
            container
            direction="column"
            justify="flex-end"
            className={classes.icons}
            xs={12}
          >
            <Typography variant="h6" align="center" gutterBottom>
              <IconButton
                href="https://github.com/MTES-MCT/declaration-travaux"
                className={classes.icon}
              >
                <FaGithub />
              </IconButton>
              <IconButton
                href="https://twitter.com/Min_Territoires"
                className={classes.icon}
              >
                <FaTwitter />
              </IconButton>
              <IconButton
                href="http://www.cohesion-territoires.gouv.fr/"
                className={classes.icon}
              >
                <FaGlobe />
              </IconButton>
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="center"
            className={classes.terms}
            xs={12}
          >
            <Button
              component={RouterLink}
              to="/aide"
              className={classes.button}
            >
              {`Aide`}
            </Button>
            <Button component={RouterLink} to="/cgu" className={classes.button}>
              {`CGU`}
            </Button>
          </Grid>
          <Grid item container direction="column" justify="flex-end" xs={12}>
            <Typography
              variant="caption"
              align="center"
              color="textSecondary"
              component="p"
            >
              {`© 2019 Ministère de la Cohésion des territoires et des Relations avec les collectivités territoriales`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
AppFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  React.memo,
  withStyles(styles)
)(AppFooter);
