import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import logo from './marianne.png';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/Button';
import { Hidden } from '@material-ui/core';
import HamburgerMenu from './HamburgerMenu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70
    }
  },
  logo: {
    width: '80%'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menu: {
    display: 'flex'
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            size="small"
            component={RouterLink}
            to="/"
          >
            <img src={logo} className={classes.logo} alt="accueil" />
          </IconButton>
          <div className={classes.root} />
          <Hidden xsDown>
            <div className={classes.root} />
            <Button
              color="primary"
              size="small"
              component={RouterLink}
              to="/communes"
            >
              {'Communes'}
            </Button>
            <Button
              color="primary"
              size="small"
              component={RouterLink}
              to="/localiser"
              data-cy="appbar-localiser-btn"
            >
              {'Localiser'}
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              component={RouterLink}
              to="/connexion"
            >
              {'Connexion'}
            </Button>
          </Hidden>
          <Hidden smUp>
            <div className={classes.root} />
            <HamburgerMenu />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
