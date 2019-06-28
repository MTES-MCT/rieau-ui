import React, { useEffect } from 'react';
import auth from 'utils/auth';
import { useAsync } from 'react-async';
import LinearProgress from '@material-ui/core/LinearProgress';
import { isApiMock } from 'utils/api';

const AuthContext = React.createContext();

async function handleApiAuth() {
  const isAuthenticated = await auth.isAuthenticated();
  if (!isAuthenticated) {
    return { isAuthenticated };
  }
  return {
    user: await auth.getUser(),
    isAuthenticated,
    isDepositaire: await auth.isDepositaire(),
    isInstructeur: await auth.isInstructeur()
  };
}

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = {
      user: null,
      isAuthenticated: false,
      isDepositaire: false,
      isInstructeur: false,
      demandes: []
    },
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: handleApiAuth
  });

  useEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <LinearProgress />;
    }
    if (isRejected) {
      return (
        <div css={{ color: 'red' }}>
          <p>{`Oops un problème est survenu au démarrage. Tentez de rafraîchir la page.`}</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }

  const login = isApiMock
    ? function(id) {
        return auth.login(id).then(reload);
      }
    : function() {
        return auth.login().then(reload);
      };
  const logout = () => auth.logout().then(reload);
  const { isAuthenticated, isDepositaire } = data;
  window.console.log('context isAuthenticated=' + isAuthenticated);
  window.console.log('context isDepositaire=' + isDepositaire);

  return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
