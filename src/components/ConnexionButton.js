import React from 'react';
import PropTypes from 'prop-types';
import { isApiMock } from 'api/api';
import Button from './Button';
import { useAuth } from 'context/auth-context';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MockUsersConnectionMenuItems from './MockUsersConnectionMenuItems';

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
              <MockUsersConnectionMenuItems appbar={appbar} />
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
  appbar: true,
  size: 'small'
};
export default ConnexionButton;
