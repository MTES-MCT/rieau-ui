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

function isDeposant() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.profils.includes('DEPOSANT'));
    }, waitingTime);
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.profils.includes('INSTRUCTEUR'));
    }, waitingTime);
  });
}

function isBeta() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal.profils.includes('BETA'));
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

function typeFromCerfa(fileName) {
  let type = '';
  if (fileName && fileName.length > 0) {
    if (fileName.toUpperCase().includes('13406_PCMI')) type = 'pcmi';
    if (fileName.toUpperCase().includes('13703_DPMI')) type = 'dp';
  }
  return type;
}

function cerfaError(file) {
  return `Fichier CERFA ${file.name} non reconnu. Seuls les fichiers nommés cerfa_13406_PCMI.pdf ou cerfa_13703_DPMI.pdf sont reconnus.`;
}

function ajouterDepot(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const type = typeFromCerfa(formData.name);
      if (type === '') return reject(new Error(cerfaError(formData)));
      const depot = {
        id: depotsFixtures.length.toString(),
        type: type,
        date: new Date().toLocaleDateString(),
        etat: 'instruction',
        userId: principal.id
      };
      depotsFixtures.push(depot);
      return resolve(depot);
    }, waitingTime);
  });
}

function checkCode(code, file) {
  if (!file.name) return true; // hack because cypress dropzone command have undefined file.name
  const type = typeFromCerfa(file.name);
  return code.includes('cerfa') ? code === type + 'cerfa' : true;
}

function savePieceJointe(dossierId, numero, formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!checkCode(numero, formData))
        return reject(new Error(cerfaError(formData)));
      return resolve(
        sessionStorage.setItem(
          numero,
          JSON.stringify({
            nom: formData.name,
            type: formData.type,
            size: formData.size,
            data: formData
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
  isDeposant: isDeposant,
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
