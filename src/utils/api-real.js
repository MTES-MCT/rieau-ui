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

function login() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'login-required' })
      .success(authenticated => {
        return resolve(authenticated);
      })
      .error(error => {
        return reject({ message: error.error_description });
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
        return reject({ message: error.error_description });
      });
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(authenticated);
      })
      .error(error => {
        return reject({ message: error.error_description });
      });
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    return keycloak
      .loadUserInfo()
      .success(userInfo => {
        return resolve(userInfo);
      })
      .error(error => {
        return reject({ message: error.error_description });
      });
  });
}

function loadUserDossiers(userId) {
  return apiHttpClient.get(`/deposants/${userId}/dossiers`);
}

const auth = {
  login,
  isAuthenticated,
  logout,
  getUser
};
const dossiers = {
  loadUserDossiers
};

const api = {
  auth,
  dossiers
};

export default api;
