import users from './users-mock';

// API de test uniquement

let principal = null;

function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.length < 1)
        return reject(JSON.stringify({ message: 'Connexion impossible' }));
      return resolve((principal = users[0]));
    }, 500);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve((principal = null));
    }, 500);
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal !== null);
    }, 500);
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!principal)
        return reject(
          JSON.stringify({ message: "Pas d'utilisateur connecté" })
        );
      return resolve(principal);
    }, 500);
  });
}

function loadUserDossiers(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve([]);
    }, 500);
  });
}

function deposer(cerfa) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(cerfa);
    }, 500);
  });
}

const auth = {
  login,
  isAuthenticated,
  logout,
  getUser
};
const dossiers = {
  loadUserDossiers,
  deposer
};

const api = {
  auth,
  dossiers
};

export default api;
