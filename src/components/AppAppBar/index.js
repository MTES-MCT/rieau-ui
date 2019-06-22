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
import routesAuthenticated from 'routes/authenticated';
import { useUser } from 'context/user-context';
import { useAuth } from 'context/auth-context';
import Typography from 'components/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItemLink from 'components/MenuItemLink';

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
  },
  button: {
    display: 'flex'
  }
});

function AppAppBar(props) {
  const { classes } = props;
  const { isAuthenticated } = useUser();
  const { login } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState();
  function handleMenu(event) {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }
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
                    <Button
                      aria-label="Dépots"
                      aria-controls="depots-menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      variant="text"
                      data-cy="appbar-depots-btn"
                    >
                      Dépôts
                    </Button>
                    <Menu
                      id="depots-menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuList>
                        {routesAuthenticated
                          .filter(
                            route =>
                              route.sidebar &&
                              !route.auth &&
                              route.id !== 'accueil'
                          )
                          .map(route => {
                            return (
                              <MenuItemLink key={route.id} route={route}>
                                {route.label}
                              </MenuItemLink>
                            );
                          })}
                      </MenuList>
                    </Menu>
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
                    <Button
                      color="primary"
                      size="small"
                      onClick={login}
                      variant="contained"
                      data-cy={'appbar-connexion-btn'}
                    >
                      {`Connexion`}
                    </Button>
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
