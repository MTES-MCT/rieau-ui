import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import logo from './marianne.png';
import Typography from '../../components/Typography';
import { Toolbar, AppBar as MuiAppBar, IconButton } from '@material-ui/core';
import Button from '../../components/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

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

function AppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ChangeToolbarColorOnScroll {...props}>
        <MuiAppBar position="fixed" elevation={0}>
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
            <Typography color="primary" variant="h4">
              {`Permis de construire facile`}
            </Typography>
            <div className={classes.root} />
            <ChangeSecondaryButtonOnScroll {...props}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                component={RouterLink}
                to="/connexion"
              >
                {'Connexion'}
              </Button>
            </ChangeSecondaryButtonOnScroll>
          </Toolbar>
        </MuiAppBar>
      </ChangeToolbarColorOnScroll>
    </div>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBar);
