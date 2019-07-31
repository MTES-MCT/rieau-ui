import React from 'react';
import PropTypes from 'prop-types';
import { isApiMock } from 'utils/api';
import Button from './Button';
import { useAuth } from 'context/auth-context';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import LockIcon from '@material-ui/icons/Lock';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function ConnexionButton(props) {
  const { color, appbar, size } = props;
  const selectedSize = size || 'small';
  const appBarPrefix = appbar ? 'appbar-' : '';
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
          id={appBarPrefix + 'connexion-btn'}
          size={selectedSize}
          onClick={login}
          variant="contained"
          data-cy={appBarPrefix + 'connexion-btn'}
          color={color}
        >
          {`Connexion`}
        </Button>
      ) : (
        <React.Fragment>
          <Button
            id={appBarPrefix + 'connexion-btn'}
            aria-controls={appBarPrefix + 'connexion-btn-menu'}
            color={color}
            size={selectedSize}
            aria-haspopup="true"
            onClick={handleMenu}
            variant="contained"
            data-cy={appBarPrefix + 'connexion-btn'}
          >
            {`Connexion`}
          </Button>
          <Menu
            id={appBarPrefix + 'connexion-btn-menu'}
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
                data-cy={appBarPrefix + 'menuitem-connexion-depositaire'}
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
                data-cy={appBarPrefix + 'menuitem-connexion-instructeur'}
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

ConnexionButton.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  appbar: PropTypes.bool.isRequired
};
ConnexionButton.defaultProps = {
  color: 'primary',
  appbar: true
};
export default ConnexionButton;
