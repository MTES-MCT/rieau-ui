import users from './users-mock';
// API de test uniquement

let principal = null;

const waitingTime = 100;

function login(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (!id)
        return reject(new Error('Connexion impossible. User id inconnu.'));
      return resolve((principal = users.find(user => user.id === id)));
    }, waitingTime);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve((principal = null));
    }, waitingTime);
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(principal !== null);
    }, waitingTime);
  });
}

function isDeposant() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(principal.profils.includes('DEPOSANT'));
    }, waitingTime);
  });
}

function isMairie() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(principal.profils.includes('MAIRIE'));
    }, waitingTime);
  });
}

function isInstructeur() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(principal.profils.includes('INSTRUCTEUR'));
    }, waitingTime);
  });
}

function isBeta() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(principal.profils.includes('BETA'));
    }, waitingTime);
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (!principal) return reject(new Error("Pas d'utilisateur connecté"));
      return resolve(principal);
    }, waitingTime);
  });
}

let DossiersFixtures = [];

function listerDossiers() {
  return new Promise((resolve, reject) => {
    setTimeout(
      function() {
        return resolve(DossiersFixtures);
      },
      function(error) {
        return reject(error);
      },
      waitingTime
    );
  });
}

function consulterDossier(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(DossiersFixtures.find(dossier => dossier.id === id));
    }, waitingTime);
  });
}

function qualifier(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const dossier = DossiersFixtures.find(dossier => dossier.id === id);
      dossier.statut = 'QUALIFIE';
      return resolve(dossier);
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

function saveInSessionStorage(dossier, numero, file) {
  const reader = new FileReader();
  reader.onload = function() {
    const binaryStr = reader.result;
    sessionStorage.setItem(
      dossier.type + numero,
      JSON.stringify({
        nom: file.name,
        type: file.type,
        size: file.size,
        data: URL.createObjectURL(new Blob([binaryStr], { type: file.type }))
      })
    );
  };
  reader.readAsBinaryString(file);
}

function ajouterDossier(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let file = formData.get('file');
      const type = typeFromCerfa(file.name);
      if (type === '') return reject(new Error(cerfaError(file)));
      const dossier = {
        id: DossiersFixtures.length.toString(),
        type: type,
        date: new Date().toLocaleDateString(),
        statut: 'DEPOSE',
        userId: principal.id,
        cerfa: {
          type: type,
          numero: '0',
          fichierId: type + '0',
          DossierId: DossiersFixtures.length.toString()
        },
        piecesAJoindre: ['1'],
        piecesJointes: []
      };
      saveInSessionStorage(dossier, '0', file);
      DossiersFixtures.push(dossier);
      return resolve();
    }, waitingTime);
  });
}

function checkCode(code, file) {
  if (!file.name) return true; // hack because cypress dropzone command have undefined file.name
  const type = typeFromCerfa(file.name);
  return code.includes('cerfa') ? code === type + '0' : true;
}

function savePieceJointe(dossierId, numero, formData) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let file = formData.get('file');
      if (!checkCode(numero, file)) throw new Error(cerfaError(file));
      let dossier = DossiersFixtures.find(dossier => dossier.id === dossierId);
      saveInSessionStorage(dossier, numero, file);
      dossier.piecesJointes.push({
        type: dossier.type,
        numero: numero,
        fichierId: dossier.type + numero,
        DossierId: dossierId
      });
      return resolve();
    }, waitingTime);
  });
}

function lireFichier(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve(JSON.parse(sessionStorage.getItem(id)));
    }, waitingTime);
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
  savePieceJointe,
  lireFichier,
  qualifier
};

const api = {
  auth,
  dossiers
};

export default api;
