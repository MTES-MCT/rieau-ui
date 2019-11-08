import AxiosKeycloak from 'utils/axios-keycloak';
import { env } from 'utils/env-helper';

// API réelle

const keycloak = new AxiosKeycloak({
  url: env('REACT_APP_SSO_APP_URL'),
  realm: env('REACT_APP_SSO_APP_REALM'),
  clientId: env('REACT_APP_SSO_APP_CLIENT_ID')
});

const apiHttpClient = keycloak.createAxiosInstance({
  baseURL: env('REACT_APP_API_URL'),
  responseType: 'json',
  responseEncoding: 'utf8',
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  withCredentials: true
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

function isDeposant() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('DEPOSANT'));
  });
}
function isMairie() {
  return new Promise((resolve, reject) => {
    return resolve(keycloak.hasRealmRole('MAIRIE'));
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
  return new Promise((resolve, reject) => {
    return keycloak
      .loadUserInfo()
      .success(userInfo => {
        return resolve({
          prenom: userInfo.given_name,
          nom: userInfo.family_name,
          email: userInfo.email
        });
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function listerDossiers() {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(apiHttpClient.get(`/dossiers`).then(res => res.data));
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function consulterDossier(id) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.get(`/dossiers/${id}`).then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function supprimerDossier(id) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.delete(`/dossiers/${id}`).then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function qualifierDossier(id) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.post(`/dossiers/${id}/qualifier`).then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function instruireDossier(id) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient.post(`/dossiers/${id}/instruire`).then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function declarerIncompletDossier(id, message) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient
            .post(`/dossiers/${id}/declarer-incomplet`, message)
            .then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function declarerCompletDossier(id) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient
            .post(`/dossiers/${id}/declarer-complet`)
            .then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function lancerConsultations(id) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient
            .post(`/dossiers/${id}/lancer-consultations`)
            .then(res => res.data)
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function prendreDecision(id, formData) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        apiHttpClient
          .post(`/dossiers/${id}/prendre-decision`, formData, {
            headers: {
              'content-type':
                'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
            }
          })
          .then(function(response) {
            return resolve(response);
          })
          .catch(function(error) {
            console.log('error=', JSON.stringify(error));
            return reject(error);
          });
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function ajouterDossier(formData) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        apiHttpClient
          .post(`/dossiers`, formData, {
            headers: {
              'content-type':
                'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
            }
          })
          .then(function(response) {
            return resolve(response);
          })
          .catch(function(error) {
            console.log('error=', JSON.stringify(error));
            return reject(error);
          });
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
          apiHttpClient
            .post(`/dossiers/${dossierId}/piecesjointes/${numero}`, formData, {
              headers: {
                'content-type':
                  'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
              }
            })
            .catch(function(error) {
              console.log('error=', JSON.stringify(error));
              return reject(error);
            })
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function saveMessage(dossierId, contenu) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient
            .post(`/dossiers/${dossierId}/messages`, contenu)
            .catch(function(error) {
              console.log('error=', JSON.stringify(error));
              return reject(error);
            })
        );
      })
      .error(error => {
        return reject(new Error(error));
      });
  });
}

function extractFileInfo(response) {
  let regex_filename = /^attachment;filename=([\w- éèëàù€êôïî]+[.]{1}[\w]+)$/i;
  let content_disposition = response.headers['content-disposition'];
  let content_type = response.headers['content-type'];
  let matches = regex_filename.exec(content_disposition);
  let fileInfo = {
    data: URL.createObjectURL(
      new Blob([response.data], { type: content_type })
    ),
    nom: matches[1],
    type: content_type
  };
  return fileInfo;
}

function lireFichier(fichierId) {
  return new Promise((resolve, reject) => {
    return keycloak
      .init({ onLoad: 'check-sso' })
      .success(authenticated => {
        return resolve(
          apiHttpClient
            .get(`/fichiers/${fichierId}`, { responseType: 'blob' })
            .then(response => extractFileInfo(response))
            .catch(function(error) {
              console.log('error=', JSON.stringify(error));
              return reject(error);
            })
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
  isMairie,
  isInstructeur,
  isBeta
};
const dossiers = {
  listerDossiers,
  consulterDossier,
  ajouterDossier,
  supprimerDossier,
  savePieceJointe,
  saveMessage,
  lireFichier,
  qualifierDossier,
  instruireDossier,
  declarerIncompletDossier,
  declarerCompletDossier,
  lancerConsultations,
  prendreDecision
};

const api = {
  auth,
  dossiers
};

export default api;
