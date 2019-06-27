import users from './users-mock';

// API de test uniquement

let principal = null;

const waitingTime = 100;

function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.length < 1)
        return reject(JSON.stringify({ message: 'Connexion impossible' }));
      return resolve((principal = users[0]));
    }, waitingTime);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve((principal = null));
    }, waitingTime);
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal !== null);
    }, waitingTime);
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
    }, waitingTime);
  });
}

function loadUserDossiers(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve([]);
    }, waitingTime);
  });
}

function savePieceJointe(nom, file, binary) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(
        sessionStorage.setItem(
          nom,
          JSON.stringify({
            nom: file.name,
            type: file.type,
            size: file.size,
            data: binary
          })
        )
      );
    }, waitingTime);
  });
}

function loadPieceJointe(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(JSON.parse(sessionStorage.getItem(id)));
    }, waitingTime);
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
  savePieceJointe,
  loadPieceJointe
};

const api = {
  auth,
  dossiers
};

export default api;
