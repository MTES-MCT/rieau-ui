import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import Button from './Button';
import compose from 'utils/compose';
import { FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import { IconButton } from '@material-ui/core';

const styles = theme => ({
  footer: {
    padding: theme.spacing(6)
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
        <Button component={RouterLink} to="/aide" className={classes.button}>
          {`Aide`}
        </Button>
        <Button component={RouterLink} to="/cgu" className={classes.button}>
          {`CGU`}
        </Button>
      </Typography>
      <Typography
        variant="caption"
        align="center"
        color="textSecondary"
        component="p"
      >
        {`Réception, Informations et Échanges pour les Autorisations d'Urbanisme.`}
      </Typography>
      <Typography
        variant="caption"
        align="center"
        color="textSecondary"
        component="p"
      >
        {`© 2019 Ministère de la Cohésion des territoires et des Relations avec les collectivités territoriales`}
      </Typography>
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
