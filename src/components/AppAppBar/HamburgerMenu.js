import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/List';
import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import routes from 'routes';
import compose from 'utils/compose';

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

class MenuItemLink extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <React.Fragment>
        <MenuItem
          data-cy={'hamburger-menu-' + route.label.toLowerCase()}
          button
          component={RouterLink}
          to={route.path}
          {...this.props}
        >
          <ListItemIcon>
            <route.icon />
          </ListItemIcon>
          {route.label}
        </MenuItem>
      </React.Fragment>
    );
  }
}
MenuItemLink.propTypes = {
  route: PropTypes.object.isRequired
};

class SideBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, toggleDrawer } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div
        className={classes.toolbar}
        role="presentation"
        onClick={event => toggleDrawer(event, false)}
        onKeyDown={event => toggleDrawer(event, false)}
      >
        <MenuList>
          {routes
            .filter(route => route.sidebar)
            .map((route, index) => {
              return (
                <MenuItemLink
                  key={index}
                  selected={index === selectedIndex}
                  route={route}
                  onClick={event => this.onClickItem(event, index)}
                />
              );
            })}
        </MenuList>
      </div>
    );
  }
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
export default compose(withStyles(styles))(HamburgerMenu);
