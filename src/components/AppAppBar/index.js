import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar, { styles as toolbarStyles } from 'components/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import logo from './marianne.png';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/Button';
import Hidden from '@material-ui/core/Hidden';
import HamburgerMenu from './HamburgerMenu';
import AccountMenu from './AccountMenu';
import routesUnauthenticated from 'routes/unauthenticated';
import { useUser } from 'context/user-context';
import { useAuth } from 'context/auth-context';
import Typography from 'components/Typography';
import Grid from '@material-ui/core/Grid';
import DepotsMenu from './DepotsMenu';
import { isApiMock } from 'utils/api';

const styles = theme => ({
  placeholder: toolbarStyles(theme).root,
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(5)
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 24
    }
  },
  logoWrapper: {
    display: 'flex'
  },
  logo: {
    width: '80%'
  },
  menu: {
    display: 'flex',
    margin: theme.spacing(2)
  }
});

function AppAppBar(props) {
  const { classes } = props;
  const { isAuthenticated } = useUser();
  const { login } = useAuth();
  return (
    <div id="app-bar">
      <AppBar position="fixed" elevation={0} color="secondary">
        <Toolbar>
          <Grid container spacing={1} wrap="nowrap">
            <Grid
              item
              container
              justify="flex-start"
              className={classes.logoWrapper}
            >
              <IconButton
                color="inherit"
                size="small"
                component={RouterLink}
                to="/"
              >
                <img src={logo} className={classes.logo} alt="accueil" />
              </IconButton>
            </Grid>
            <Grid
              item
              container
              justify="center"
              className={classes.titleWrapper}
            >
              <Typography
                color="inherit"
                align="center"
                variant="h3"
                className={classes.title}
              >
                {process.env.REACT_APP_NAME}
              </Typography>
            </Grid>
            <Grid item container justify="flex-end" className={classes.menu}>
              <Hidden xsDown>
                {isAuthenticated ? (
                  <React.Fragment>
                    <DepotsMenu />
                    <AccountMenu />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {routesUnauthenticated
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
                    {isApiMock ? (
                      <React.Fragment>
                        <Button
                          color="primary"
                          size="small"
                          onClick={function(event) {
                            return login('jean.martin');
                          }}
                          variant="contained"
                          data-cy={'appbar-connexion-depositaire-btn'}
                        >
                          {`Connexion Dépositaire`}
                        </Button>
                        <Button
                          color="primary"
                          size="small"
                          onClick={function(event) {
                            return login('jacques.dupont');
                          }}
                          variant="contained"
                          data-cy={'appbar-connexion-instructeur-btn'}
                        >
                          {`Connexion Instructeur`}
                        </Button>
                      </React.Fragment>
                    ) : (
                      <Button
                        color="primary"
                        size="small"
                        onClick={login}
                        variant="contained"
                        data-cy={'appbar-connexion-btn'}
                      >
                        {`Connexion`}
                      </Button>
                    )}
                  </React.Fragment>
                )}
              </Hidden>
              <Hidden smUp>
                <HamburgerMenu />
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
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
