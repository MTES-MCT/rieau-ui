import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import logo from './marianne.png';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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

function ChangeToolbarColorOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    color: trigger ? 'secondary' : 'primary'
  });
}

ChangeToolbarColorOnScroll.propTypes = {
  children: PropTypes.node.isRequired
};

function ChangePrimaryButtonOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return React.cloneElement(children, {
    color: trigger ? 'secondary' : 'primary'
  });
}

ChangePrimaryButtonOnScroll.propTypes = {
  children: PropTypes.node.isRequired
};

function ChangeSecondaryButtonOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return React.cloneElement(children, {
    color: trigger ? 'primary' : 'secondary'
  });
}

ChangeSecondaryButtonOnScroll.propTypes = {
  children: PropTypes.node.isRequired
};

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ChangeToolbarColorOnScroll {...props}>
        <AppBar position="fixed" elevation={0}>
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
              <ChangePrimaryButtonOnScroll {...props}>
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  component={RouterLink}
                  to="/communes"
                >
                  {'Communes'}
                </Button>
              </ChangePrimaryButtonOnScroll>
              <ChangeSecondaryButtonOnScroll {...props}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="medium"
                  component={RouterLink}
                  to="/connexion"
                >
                  {'Connexion'}
                </Button>
              </ChangeSecondaryButtonOnScroll>
            </Hidden>
            <Hidden smUp>
              <div className={classes.root} />
              <HamburgerMenu />
            </Hidden>
          </Toolbar>
        </AppBar>
      </ChangeToolbarColorOnScroll>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
