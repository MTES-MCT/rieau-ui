import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SignInIcon from '@material-ui/icons/Lock';
import MenuList from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import routesUnauthenticated from 'routes/unauthenticated';
import routesAuthenticated from 'routes/authenticated';
import compose from 'utils/compose';
import MenuItemLink from 'components/MenuItemLink';
import { withRouter } from 'react-router-dom';
import { useAuth } from 'context/auth-context';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useUser } from 'context/user-context';
import { isApiMock } from 'utils/api';
import MockUsersConnectionMenuItems from 'components/MockUsersConnectionMenuItems';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  list: {
    width: drawerWidth
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    color: 'primary',
    marginRight: theme.spacing(2)
  }
});

function SideBarMenu(props) {
  const { classes, toggleDrawer } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { login, logout } = useAuth();
  const { isAuthenticated, isBeta } = useUser();
  const moncompte = routesAuthenticated.find(route => route.id === 'moncompte');
  const deconnexion = routesAuthenticated.find(
    route => route.id === 'deconnexion'
  );
  function onClickItem(event, index) {
    setSelectedIndex(index);
  }
  return (
    <div
      className={classes.toolbar}
      role="presentation"
      onClick={event => toggleDrawer(event, false)}
      onKeyDown={event => toggleDrawer(event, false)}
    >
      {isAuthenticated ? (
        <MenuList>
          {routesAuthenticated
            .filter(
              route =>
                route.sidebar &&
                (route.id !== 'depots' ? route.beta === isBeta : true) &&
                !route.auth
            )
            .map(route => {
              return (
                <MenuItemLink
                  key={route.id}
                  selected={route.id === selectedIndex}
                  route={route}
                  onClick={event => onClickItem(event, route.id)}
                />
              );
            })}
          <MenuItemLink
            route={moncompte}
            onClick={event => onClickItem(event, moncompte.id)}
          />
          <MenuItem button onClick={logout}>
            <ListItemIcon>
              <deconnexion.icon />
            </ListItemIcon>
            {deconnexion.label}
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          {routesUnauthenticated
            .filter(route => route.sidebar)
            .map(route => {
              return (
                <MenuItemLink
                  key={route.id}
                  selected={route.id === selectedIndex}
                  route={route}
                  onClick={event => onClickItem(event, route.id)}
                />
              );
            })}
          {isApiMock ? (
            <MockUsersConnectionMenuItems />
          ) : (
            <MenuItem button onClick={login} data-cy="menu-item-btn-connexion">
              <ListItemIcon>
                <SignInIcon />
              </ListItemIcon>
              {`Connexion`}
            </MenuItem>
          )}
        </MenuList>
      )}
    </div>
  );
}
SideBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      right: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (event, open) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    this.setState({ right: open });
  };

  render() {
    const { classes } = this.props;
    const { right } = this.state;
    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <IconButton
            edge="start"
            color="primary"
            className={classes.menuButton}
            onClick={event => this.toggleDrawer(event, true)}
            data-cy="hamburger-menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={right}
            onClose={event => this.toggleDrawer(event, false)}
          >
            <SideBarMenu classes={classes} toggleDrawer={this.toggleDrawer} />
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}
HamburgerMenu.propTypes = {
  classes: PropTypes.object.isRequired
};
export default compose(
  withRouter,
  withStyles(styles)
)(HamburgerMenu);
