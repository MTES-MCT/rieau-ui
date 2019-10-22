import api from 'utils/api';

function handleDossiers() {
  return api.then(api => {
    return api.default.dossiers;
  });
}

function listerDossiers() {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.listerDossiers();
  });
}

function consulterDossier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.consulterDossier(id);
  });
}

function qualifierDossier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.qualifierDossier(id);
  });
}

function instruireDossier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.instruireDossier(id);
  });
}

function declarerIncompletDossier(id, message) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.declarerIncompletDossier(id, message);
  });
}

function declarerCompletDossier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.declarerCompletDossier(id);
  });
}

function ajouterDossier(formData) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.ajouterDossier(formData);
  });
}

function supprimerDossier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.supprimerDossier(id);
  });
}

function savePieceJointe(dossierId, numero, formData) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.savePieceJointe(dossierId, numero, formData);
  });
}

function saveMessage(dossierId, message) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.saveMessage(dossierId, message);
  });
}

function lireFichier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.lireFichier(id);
  });
}

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
  declarerCompletDossier
};

export default dossiers;
