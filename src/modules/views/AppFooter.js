import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';
import compose from '../utils/compose';
import { FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    icon: {
      fontSize: 24,
      margin: theme.spacing(1)
    },
});

function AppFooter(props) {
    const { classes } = props;
  
    return (
        <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>          
          <a href="https://github.com/MTES-MCT/permis-construire-facile-ui" className={classes.icon}>
            <FaGithub />
          </a>
          <a href="https://twitter.com/Min_Territoires" className={classes.icon}>
            <FaTwitter />
          </a>
          <a href="http://www.cohesion-territoires.gouv.fr" className={classes.icon}>
            <FaGlobe />
          </a>
        </Typography>
        <Typography variant="caption" align="center" color="textSecondary" component="p">
          © 2019 Ministère de la cohésion des territoires et des relations avec les collectivités territoriales
        </Typography>
      </footer>
    );
}
AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  React.memo,
  withStyles(styles),
)(AppFooter);