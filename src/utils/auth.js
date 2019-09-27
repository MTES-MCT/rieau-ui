import api, { isApiMock } from 'utils/api';

function handleAuth() {
  return api.then(api => {
    return api.default.auth;
  });
}

function getUser() {
  return api.then(handleAuth).then(auth => {
    return auth.getUser();
  });
}

function isAuthenticated() {
  return api.then(handleAuth).then(auth => {
    return auth.isAuthenticated();
  });
}

function isInstructeur() {
  return api.then(handleAuth).then(auth => {
    return auth.isInstructeur();
  });
}

function isDeposant() {
  return api.then(handleAuth).then(auth => {
    return auth.isDeposant();
  });
}

function isBeta() {
  return api.then(handleAuth).then(auth => {
    return auth.isBeta();
  });
}

const login = isApiMock
  ? function(id) {
      return api.then(handleAuth).then(auth => {
        return auth.login(id);
      });
    }
  : function() {
      return api.then(handleAuth).then(auth => {
        return auth.login();
      });
    };

function logout() {
  return api.then(handleAuth).then(auth => {
    return auth.logout();
  });
}

const auth = {
  login,
  logout,
  isAuthenticated,
  getUser,
  isDeposant,
  isInstructeur,
  isBeta
};

export default auth;
