import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../../components/Toolbar';
import logo from './marianne.png';

const styles = theme => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            component={RouterLink}
            to="/"
          >
            <img src={logo} className={classes.logo} alt="accueil" />
          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/connexion"
            >
              {'Déposer'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={classes.rightLink}
              component={RouterLink}
              to="/aide"
            >
              {'Aide'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={classes.rightLink}
              component={RouterLink}
              to="/cgu"
            >
              {'CGU'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
