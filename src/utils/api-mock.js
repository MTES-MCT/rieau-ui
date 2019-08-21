import users from './users-mock';

// API de test uniquement

let principal = null;

const waitingTime = 100;

function login(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id)
        return reject(new Error('Connexion impossible. User id inconnu.'));
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
      return resolve(principal.profils.includes('depositaire'));
    }, waitingTime);
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.profils.includes('instructeur'));
    }, waitingTime);
  });
}

function isBeta() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.profils.includes('beta'));
    }, waitingTime);
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!principal) return reject(new Error("Pas d'utilisateur connecté"));
      return resolve(principal);
    }, waitingTime);
  });
}

let depotsFixtures = [
  {
    id: '0',
    type: 'dp',
    date: '01/01/2019',
    etat: 'instruction',
    userId: 'jean.martin'
  },
  {
    id: '1',
    type: 'pcmi',
    date: '01/07/2019',
    etat: 'incomplet',
    userId: 'jean.martin'
  }
];

function mesDepots() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        depots: depotsFixtures,
        page: 0,
        totalCount: 1
      });
    }, waitingTime);
  });
}

function monDepot(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(depotsFixtures.find(depot => depot.id === id));
    }, waitingTime);
  });
}

function ajouterDepot() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(
        depotsFixtures.push({
          id: depotsFixtures.length.toString(),
          type: 'pcmi',
          date: new Date().toLocaleDateString(),
          etat: 'instruction'
        })
      );
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
  isInstructeur,
  isBeta
};
const depots = {
  mesDepots,
  monDepot,
  ajouterDepot,
  savePieceJointe,
  loadPieceJointe
};

const api = {
  auth,
  depots
};

export default api;
