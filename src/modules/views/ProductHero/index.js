import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import ProductHeroLayout from './Layout';
import hero from './hero.jpg';

const styles = theme => ({
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={hero} alt="hero" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Permis de construire facile
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        {`Déposer et suivre simplement sa demande d'autorisation
        d'urbanisme en ligne.`}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={RouterLink}
        to="/connexion"
      >
        Déposer
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
