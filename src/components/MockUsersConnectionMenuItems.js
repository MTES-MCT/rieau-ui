import React from 'react';
import { useAuth } from 'context/auth-context';
import { MenuItem, ListItemIcon } from '@material-ui/core';
import SignInIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types';

function MockUsersConnectionMenuItems(props) {
  const { appbar } = props;
  const { login } = useAuth();
  const prefixDataCy = `${appbar && 'appbar-'}menu-item-btn-connexion`;
  return (
    <React.Fragment>
      <MenuItem
        button
        onClick={function(event) {
          return login('jean.martin');
        }}
        data-cy={`${prefixDataCy}-deposant`}
      >
        <ListItemIcon>
          <SignInIcon />
        </ListItemIcon>
        {`Connexion Déposant`}
      </MenuItem>
      <MenuItem
        button
        onClick={function(event) {
          return login('jacques.dupont');
        }}
        data-cy={`${prefixDataCy}-instructeur`}
      >
        <ListItemIcon>
          <SignInIcon />
        </ListItemIcon>
        {`Connexion Instructeur`}
      </MenuItem>
      <MenuItem
        button
        onClick={function(event) {
          return login('madame.le-maire');
        }}
        data-cy={`${prefixDataCy}-mairie`}
      >
        <ListItemIcon>
          <SignInIcon />
        </ListItemIcon>
        {`Connexion Mairie`}
      </MenuItem>
    </React.Fragment>
  );
}
MockUsersConnectionMenuItems.propTypes = {
  appbar: PropTypes.bool
};

export default MockUsersConnectionMenuItems;
