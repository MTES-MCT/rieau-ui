import React from 'react';
import { useAuth } from 'context/auth-context';
import { MenuItem, ListItemIcon } from '@material-ui/core';
import SignInIcon from '@material-ui/icons/Lock';

function MockUsersConnectionMenuItems() {
  const { login } = useAuth();
  return (
    <React.Fragment>
      <MenuItem
        button
        onClick={function(event) {
          return login('jean.martin');
        }}
        data-cy="menu-item-btn-connexion-deposant"
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
        data-cy="menu-item-btn-connexion-instructeur"
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
        data-cy="menu-item-btn-connexion-mairie"
      >
        <ListItemIcon>
          <SignInIcon />
        </ListItemIcon>
        {`Connexion Mairie`}
      </MenuItem>
    </React.Fragment>
  );
}

export default MockUsersConnectionMenuItems;
