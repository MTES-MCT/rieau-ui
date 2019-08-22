import AxiosKeycloak from 'utils/axios-keycloak';
import { env } from 'utils/env-helper';

// API réelle

const keycloak = new AxiosKeycloak({
  url: env('REACT_APP_SSO_APP_URL'),
  realm: env('REACT_APP_SSO_APP_REALM'),
  clientId: env('REACT_APP_SSO_APP_CLIENT_ID')
});

const apiHttpClient = keycloak.createAxiosInstance({
  baseURL: env('REACT_APP_API_URL')
});

function login() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'login-required' })
      .success(authenticated => {
        return resolve(authenticated);
      })
      .error(error => {
        return reject(new Error(error));
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
        return reject(new Error(error));
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
        return reject(new Error(error));
      });
  });
}

function isDepositaire() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('depositaire'));
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('instructeur'));
  });
}

function isBeta() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('beta'));
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    return keycloak
      .loadUserInfo()
      .success(userInfo => {
        return resolve({
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email
        });
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function mesDepots() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(apiHttpClient.get(`/depots`));
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function ajouterDepot(file, binary) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(apiHttpClient.post(`/depots`, { file, binary }));
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function savePieceJointe(code, file, binary) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.post(`/piecesjointes`, { code, file, binary })
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

const auth = {
  login,
  isAuthenticated,
  logout,
  getUser,
  isDepositaire,
  isInstructeur,
  isBeta
};
const depots = {
  mesDepots,
  ajouterDepot,
  savePieceJointe
};

const api = {
  auth,
  depots
};

export default api;
