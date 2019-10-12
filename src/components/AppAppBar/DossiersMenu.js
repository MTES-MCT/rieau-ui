import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';
import Menu from '@material-ui/core/Menu';
import MenuItemLink from 'components/MenuItemLink';
import MenuList from '@material-ui/core/MenuList';
import compose from 'utils/compose';
import routesAuthenticated from 'routes/authenticated';
import { useUser } from 'context/user-context';

const styles = theme => ({
  root: {}
});

function DossiersMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState();
  const { isBeta } = useUser();

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
        aria-label="Dossiers"
        aria-controls="dossiers-menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        variant="text"
        data-cy="appbar-dossiers-btn"
      >
        {`Dossiers`}
      </Button>
      <Menu
        id="dossiers-menu-appbar"
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
                (route.id !== 'dossiers' ? route.beta === isBeta : true) &&
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
    </React.Fragment>
  );
}

export default compose(
  withRouter,
  withStyles(styles)
)(DossiersMenu);
