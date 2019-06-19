import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import logo from './marianne.png';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/Button';
import Hidden from '@material-ui/core/Hidden';
import HamburgerMenu from './HamburgerMenu';
import AccountMenu from './AccountMenu';
import routes from 'routes/unauthenticated';
import { useUser } from 'context/user-context';
import { useAuth } from 'context/auth-context';

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
  const { isAuthenticated } = useUser();
  const { login } = useAuth();
  return (
    <div className={classes.root} id="app-bar">
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

            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <React.Fragment>
                {routes
                  .filter(route => route.sidebar && !route.auth)
                  .map(route => {
                    return (
                      <Button
                        key={route.id}
                        color="primary"
                        size={'small'}
                        component={RouterLink}
                        variant={'text'}
                        to={route.path}
                        data-cy={'appbar-' + route.id + '-btn'}
                      >
                        {route.label}
                      </Button>
                    );
                  })}
                <Button
                  color="primary"
                  size={'medium'}
                  onClick={login}
                  variant={'contained'}
                  data-cy={'appbar-connexion-btn'}
                >
                  {`Connexion`}
                </Button>
              </React.Fragment>
            )}
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
  classes: PropTypes.object.isRequired,
  login: PropTypes.func,
  logout: PropTypes.func,
  register: PropTypes.func
};

export default withStyles(styles)(AppAppBar);
