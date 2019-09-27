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
    console.log('login');
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
  console.log('isAuthenticated');
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

function isDeposant() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('DEPOSANT'));
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('INSTRUCTEUR'));
  });
}

function isBeta() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('BETA'));
  });
}

function getUser() {
  console.log('getUser');
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
        return resolve(apiHttpClient.get(`/dossiers`));
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function ajouterDepot(formData) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.post(`/dossiers`, formData, {
            headers: {
              'content-type':
                'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
            }
          })
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function savePieceJointe(dossierId, numero, formData) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.post(
            `/dossiers/${dossierId}/piecesjointes/${numero}`,
            formData,
            {
              headers: {
                'content-type':
                  'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
              }
            }
          )
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
  isDeposant,
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
