import api from 'utils/api';

function getUser() {
  return api.then(api => {
    return api.default.auth.getUser();
  });
}

function isAuthenticated() {
  return api.then(api => {
    return api.default.auth.isAuthenticated();
  });
}

function login() {
  return api.then(api => {
    return api.default.auth.login();
  });
}

function logout() {
  return api.then(api => {
    return api.default.auth.logout();
  });
}

const auth = {
  login,
  logout,
  isAuthenticated,
  getUser
};

export default auth;
