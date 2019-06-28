import axios from 'axios';
import Keycloak from 'keycloak-js';

// API réelle

const apiHttpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000
});

const keycloak = Keycloak({
  url: process.env.REACT_APP_SSO_APP_URL,
  realm: process.env.REACT_APP_SSO_APP_REALM,
  clientId: process.env.REACT_APP_SSO_APP_CLIENT_ID
});

axios.interceptors.request.use(
  function(config) {
    const token = keycloak.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function login() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'login-required' })
      .success(authenticated => {
        window.console.log('login isAuthenticated=' + authenticated);
        return resolve(authenticated);
      })
      .error(error => {
        return reject({ message: JSON.stringify(error) });
      });
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    return keycloak
      .logout()
      .success(authenticated => {
        return resolve(authenticated);
      })
      .error(error => {
        return reject({ message: JSON.stringify(error) });
      });
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        window.console.log('api isAuthenticated=' + authenticated);
        return resolve(authenticated);
      })
      .error(error => {
        return reject({ message: JSON.stringify(error) });
      });
  });
}

function isDepositaire() {
  return new Promise((resolve, reject) => {
    return keycloak
      .hasRealmRole('depositaire')
      .success(hasRole => {
        return resolve(hasRole);
      })
      .error(error => {
        return reject({ message: JSON.stringify(error) });
      });
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    return keycloak
      .hasRealmRole('instructeur')
      .success(hasRole => {
        return resolve(hasRole);
      })
      .error(error => {
        return reject({ message: JSON.stringify(error) });
      });
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    return keycloak
      .loadUserInfo()
      .success(userInfo => {
        window.console.log('api user=' + JSON.stringify(userInfo));
        return resolve({
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email
        });
      })
      .error(error => {
        return reject({ message: JSON.stringify(error) });
      });
  });
}

function mesDemandes() {
  return apiHttpClient.get(`/demandes`);
}

function savePieceJointe(code, file, binary) {
  return apiHttpClient.post(`/piecesjointes`, { code, file, binary });
}

const auth = {
  login,
  isAuthenticated,
  logout,
  getUser,
  isDepositaire,
  isInstructeur
};
const demandes = {
  mesDemandes,
  savePieceJointe
};

const api = {
  auth,
  demandes
};

export default api;
