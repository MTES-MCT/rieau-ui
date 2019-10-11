import React, { useContext, createContext } from 'react';
import { useAuth } from './auth-context';

const UserContext = createContext();

function UserProvider(props) {
  const {
    data: { user, isAuthenticated, isDeposant, isMairie, isInstructeur, isBeta }
  } = useAuth();
  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isDeposant,
        isMairie,
        isInstructeur,
        isBeta
      }}
      {...props}
    />
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
