import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItemLink from 'components/MenuItemLink';
import compose from 'utils/compose';
import routesAuthenticated from 'routes/authenticated';
import { useAuth } from 'context/auth-context';
import { MenuItem, ListItemIcon, MenuList } from '@material-ui/core';
import { useUser } from 'context/user-context';

const styles = theme => ({
  root: {}
});

function AccountMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState();
  const { logout } = useAuth();
  const { isAuthenticated } = useUser();
  const moncompte = routesAuthenticated.find(route => route.id === 'moncompte');
  const deconnexion = routesAuthenticated.find(
    route => route.id === 'deconnexion'
  );

  function handleMenu(event) {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }
  return (
    <React.Fragment>
      <div>
        <IconButton
          aria-label="Mon compte"
          aria-controls="account-menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          data-cy="account-menu-appbar"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        <Menu
          id="account-menu-appbar"
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
          {isAuthenticated && (
            <MenuList>
              <MenuItemLink route={moncompte}>Profil</MenuItemLink>
              <MenuItem
                button
                onClick={logout}
                data-cy="acount-menu-item-deconnexion"
              >
                <ListItemIcon>
                  <deconnexion.icon />
                </ListItemIcon>
                {deconnexion.label}
              </MenuItem>
            </MenuList>
          )}
        </Menu>
      </div>
    </React.Fragment>
  );
}

export default compose(
  withRouter,
  withStyles(styles)
)(AccountMenu);
