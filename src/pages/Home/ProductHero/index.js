import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../../../components/Typography';
import ProductHeroLayout from './Layout';
import hero from './hero.jpg';
import Localiser from './Localiser';
import { Paper } from '@material-ui/core';

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

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout>
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
        <Localiser />
      </div>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
