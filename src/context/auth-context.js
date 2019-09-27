import React from 'react';
import auth from 'utils/auth';
import { useAsync } from 'react-async';
import LinearProgress from '@material-ui/core/LinearProgress';
import { isApiMock } from 'utils/api';
import Error from 'pages/Error';

const AuthContext = React.createContext();

async function handleApiAuth() {
  console.log('handleApiAuth');
  const isAuthenticated = await auth.isAuthenticated();
  console.log('isAuthenticated=' + isAuthenticated);
  if (!isAuthenticated)
    return {
      user: null,
      isAuthenticated,
      isDeposant: false,
      isInstructeur: false,
      isBeta: false,
      dossiers: []
    };
  return {
    user: await auth.getUser(),
    isAuthenticated,
    isDeposant: await auth.isDeposant(),
    isInstructeur: await auth.isInstructeur(),
    isBeta: await auth.isBeta()
  };
}

function AuthProvider(props) {
  const { data, error, isRejected, isLoading, reload } = useAsync({
    promiseFn: handleApiAuth
  });

  if (isLoading) {
    return <LinearProgress />;
  }
  if (isRejected) {
    return <Error error={error.message} />;
  }

  if (data) {
    const login = isApiMock
      ? function(id) {
          return auth.login(id).then(reload);
        }
      : function() {
          return auth.login().then(reload);
        };
    const logout = () => auth.logout().then(reload);

    return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
  }
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
