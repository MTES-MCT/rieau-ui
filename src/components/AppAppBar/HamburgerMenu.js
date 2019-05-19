import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  link: {
    color: 'secondary'
  },
  menu: {
    display: 'flex'
  }
});

function HamburgerMenu(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        aria-owns={anchorEl ? 'hamburger-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        className={classes.menu}
        id="hamburger-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <List>
          <ListItemLink
            component={RouterLink}
            to="/communes"
            onClick={handleClose}
          >
            {`Communes`}
          </ListItemLink>
          <ListItemLink
            component={RouterLink}
            to="/connexion"
            onClick={handleClose}
          >
            {`Connexion`}
          </ListItemLink>
        </List>
      </Menu>
    </div>
  );
}

HamburgerMenu.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(HamburgerMenu);
