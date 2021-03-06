import users from 'api/mock/users-mock';
import statuts from 'api/mock/statuts-mock';
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

let dossiersFixtures = [];

function listerDossiers() {
  return new Promise((resolve, reject) => {
    setTimeout(
      function() {
        return resolve(dossiersFixtures);
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
      return resolve(dossiersFixtures.find(dossier => dossier.id === id));
    }, waitingTime);
  });
}

function supprimerDossier(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const dossier = dossiersFixtures.find(dossier => dossier.id === id);
      const index = dossiersFixtures.indexOf(dossier);
      dossiersFixtures.splice(index, 1);
      sessionStorage.removeItem(dossier.type.id + '0'); // CERFA
      for (var pieceJointe in dossier.piecesJointes) {
        sessionStorage.removeItem(pieceJointe.fichierId);
      }
      return resolve();
    }, waitingTime);
  });
}

function now() {
  return new Date();
}

function addStatut(dossier, statutId) {
  dossier.statutActuel = statuts.find(s => s.id === statutId);
  dossier.statutActuel.dateDebut = now();
  dossier.statutActuel.joursRestants = dossier.statutActuel.delai;
  dossier.statuts.push(dossier.statutActuel);
  dossier.statutsRestants = statuts.filter(
    statut =>
      statut.ordre > dossier.statutActuel.ordre && statut.id !== 'INCOMPLET'
  );
}

function qualifierDossier(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const dossier = dossiersFixtures.find(dossier => dossier.id === id);
      addStatut(dossier, 'QUALIFIE');
      return resolve(dossier);
    }, waitingTime);
  });
}

function addMessage(dossier, contenu) {
  dossier.messages.push({
    date: now(),
    contenu: contenu,
    auteur: principal
  });
  dossier.messages.sort((m1, m2) => -(m1.date - m2.date));
}

function declarerIncompletDossier(id, contenu) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const dossier = dossiersFixtures.find(dossier => dossier.id === id);
      addStatut(dossier, 'INCOMPLET');
      addMessage(dossier, contenu);
      return resolve(dossier);
    }, waitingTime);
  });
}

function declarerCompletDossier(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const dossier = dossiersFixtures.find(dossier => dossier.id === id);
      addStatut(dossier, 'COMPLET');
      return resolve(dossier);
    }, waitingTime);
  });
}

function prendreDecision(dossierId, formData) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let file = formData.get('file');
      const dossier = dossiersFixtures.find(
        dossier => dossier.id === dossierId
      );
      addStatut(dossier, 'DECISION');
      const decision = {
        type: dossier.type,
        numero: 'd',
        fichierId: dossier.type.id + 'd',
        dossierId: dossiersFixtures.length.toString()
      };
      dossier.decision = decision;
      saveInSessionStorage(dossier, 'd', file);
      return resolve(dossier);
    }, waitingTime);
  });
}

function typeFromCerfa(fileName) {
  let type = '';
  if (fileName && fileName.length > 0) {
    if (fileName.toUpperCase().includes('13406_PCMI'))
      type = {
        id: 'PCMI',
        libelle: 'Permis de construire de maison individuelle'
      };
    if (fileName.toUpperCase().includes('13703_DPMI'))
      type = { id: 'DPMI', libelle: 'Déclaration préalable' };
  }
  return type;
}

function piecesAJoindre(type) {
  let piecesAJoindre = [];
  if (type.id === 'PCMI')
    piecesAJoindre = ['1', '2', '3', '4', '5', '6', '7', '8'];
  if (type.id === 'DPMI') piecesAJoindre = ['1'];
  return piecesAJoindre;
}

function cerfaError(file) {
  return `Fichier CERFA ${file.name} non reconnu. Seuls les fichiers nommés cerfa_13406_PCMI.pdf ou cerfa_13703_DPMI.pdf sont reconnus.`;
}

function saveInSessionStorage(dossier, numero, file) {
  const reader = new FileReader();
  reader.onload = function() {
    const binaryStr = reader.result;
    sessionStorage.setItem(
      dossier.type.id + numero,
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
      const cerfa = {
        type: type,
        numero: '0',
        fichierId: type.id + '0',
        dossierId: dossiersFixtures.length.toString()
      };
      let dossier = {
        id: dossiersFixtures.length.toString(),
        type: type,
        userId: principal.id,
        cerfa: cerfa,
        piecesAJoindre: piecesAJoindre(type),
        piecesJointes: [],
        statuts: [],
        statutsRestants: statuts,
        messages: []
      };
      addStatut(dossier, 'DEPOSE');
      saveInSessionStorage(dossier, '0', file);
      dossiersFixtures.push(dossier);
      return resolve();
    }, waitingTime);
  });
}

function checkCode(code, file) {
  if (!file.name) return true; // hack because cypress dropzone command have undefined file.name
  const type = typeFromCerfa(file.name);
  let checked = true;
  if (code.includes('cerfa')) checked = code === type.id + '0';
  if (code.includes(type)) checked = code === type.id + 'd';
  return checked;
}

function savePieceJointe(dossierId, numero, formData) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let file = formData.get('file');
      if (!checkCode(numero, file)) throw new Error(cerfaError(file));
      let dossier = dossiersFixtures.find(dossier => dossier.id === dossierId);
      saveInSessionStorage(dossier, numero, file);
      dossier.piecesJointes.push({
        type: dossier.type,
        numero: numero,
        fichierId: dossier.type.id + numero,
        DossierId: dossierId
      });
      return resolve();
    }, waitingTime);
  });
}

function saveMessage(dossierId, contenu) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let dossier = dossiersFixtures.find(dossier => dossier.id === dossierId);
      addMessage(dossier, contenu);
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
  saveMessage,
  lireFichier,
  qualifierDossier,
  declarerIncompletDossier,
  declarerCompletDossier,
  prendreDecision,
  supprimerDossier
};

const api = {
  auth,
  dossiers
};

export default api;
