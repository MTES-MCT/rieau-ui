import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';
import Menu from '@material-ui/core/Menu';
import MenuItemLink from 'components/MenuItemLink';
import MenuList from '@material-ui/core/MenuList';
import compose from 'utils/compose';
import routesAuthenticated from 'routes/authenticated';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { isApiMock } from 'utils/api';

const styles = theme => ({
  root: {}
});

function DepotsMenu(props) {
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
      <Button
        aria-label="Dépots"
        aria-controls="depots-menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        variant="text"
        data-cy="appbar-depots-btn"
      >
        {`Mes dépôts`}
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
                route.id !== 'accueil' &&
                route.id !== 'piecesjointes'
            )
            .map(route => {
              return (
                <MenuItemLink key={route.id} route={route}>
                  {route.label}
                </MenuItemLink>
              );
            })}
          {isApiMock ? (
            <React.Fragment>
              <MenuItem
                data-cy={'menu-item-link-piecesjointes-pcmi'}
                button
                component={RouterLink}
                to={'/piecesjointes/pcmi'}
              >
                <ListItemIcon>
                  <SaveAltIcon />
                </ListItemIcon>
                {`Pièces jointes PCMI`}
              </MenuItem>
              <MenuItem
                data-cy={'menu-item-link-piecesjointes-dp'}
                button
                component={RouterLink}
                to={'/piecesjointes/dp'}
              >
                <ListItemIcon>
                  <SaveAltIcon />
                </ListItemIcon>
                {`Pièces jointes DP`}
              </MenuItem>
            </React.Fragment>
          ) : (
            <MenuItem
              data-cy={'menu-item-link-piecesjointes'}
              button
              component={RouterLink}
              to={'/piecesjointes'}
            >
              <ListItemIcon>
                <SaveAltIcon />
              </ListItemIcon>
              {`Pièces jointes`}
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

export default compose(
  withRouter,
  withStyles(styles)
)(DepotsMenu);
