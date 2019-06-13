import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link as RouterLink } from 'react-router-dom';

class MenuItemLink extends React.Component {
  static propTypes = {
    route: PropTypes.object.isRequired
  };
  render() {
    const { route } = this.props;
    return (
      <React.Fragment>
        <MenuItem
          data-cy={'menu-item-link-' + route.id}
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

export default MenuItemLink;
