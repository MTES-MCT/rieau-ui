import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../../../components/Typography';
import HeroLayout from './Layout';
import hero from './hero.jpg';
import Paper from '@material-ui/core/Paper';
import Button from '../../../components/Button';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  button: {
    minWidth: 200
  },
  more: {
    marginTop: theme.spacing(2)
  },
  localiser: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      bottom: theme.spacing(20)
    }
  }
});

function Hero(props) {
  const { classes } = props;

  return (
    <HeroLayout>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={hero} alt="hero" />
      <Paper>
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Permis de construire facile
        </Typography>
      </Paper>
      <Paper>
        <Typography color="inherit" align="center" variant="h5">
          {`Déposez et gérez votre déclaration préalable de travaux en toute simplicité.`}
        </Typography>
      </Paper>
      <div className={classes.localiser}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={RouterLink}
          to="/aide"
        >
          {'Commencer'}
        </Button>
      </div>
    </HeroLayout>
  );
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hero);
