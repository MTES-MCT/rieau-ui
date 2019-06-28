import users from './users-mock';

// API de test uniquement

let principal = null;

const waitingTime = 100;

function login(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id)
        return reject(
          JSON.stringify({ message: 'Connexion impossible. User id inconnu.' })
        );
      return resolve((principal = users.find(user => user.id === id)));
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

function isDepositaire() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.id === 'jean.martin');
    }, waitingTime);
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.id === 'jacques.dupont');
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

function mesDemandes() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve([]);
    }, waitingTime);
  });
}

function savePieceJointe(code, file, binary) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(
        sessionStorage.setItem(
          code,
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

function loadPieceJointe(code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(JSON.parse(sessionStorage.getItem(code)));
    }, waitingTime);
  });
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
  savePieceJointe,
  loadPieceJointe
};

const api = {
  auth,
  demandes
};

export default api;
