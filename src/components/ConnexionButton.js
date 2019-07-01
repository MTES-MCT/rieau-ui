import React from 'react';
import { isApiMock } from 'utils/api';
import Button from './Button';
import { useAuth } from 'context/auth-context';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import LockIcon from '@material-ui/icons/Lock';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function ConnexionButton(props) {
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
    <React.Fragment>
      {!isApiMock ? (
        <Button
          aria-controls="connexion-menu-appbar"
          color="primary"
          size="small"
          onClick={login}
          variant="contained"
          data-cy={'appbar-connexion-btn'}
        >
          {`Connexion`}
        </Button>
      ) : (
        <React.Fragment>
          <Button
            color="primary"
            size="small"
            aria-haspopup="true"
            onClick={handleMenu}
            variant="contained"
            data-cy={'appbar-connexion-btn'}
          >
            {`Connexion`}
          </Button>
          <Menu
            id="connexion-menu-appbar"
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
              <MenuItem
                onClick={function(event) {
                  return login('jean.martin');
                }}
                button
                data-cy={'menuitem-connexion-depositaire'}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                {`Connexion Dépositaire`}
              </MenuItem>
              <MenuItem
                onClick={function(event) {
                  return login('jacques.dupont');
                }}
                button
                data-cy={'menuitem-connexion-instructeur'}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                {`Connexion Instructeur`}
              </MenuItem>
            </MenuList>
          </Menu>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ConnexionButton;
