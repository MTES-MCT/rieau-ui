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

function qualifier(id) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.qualifier(id);
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
  lireFichier,
  qualifier
};

export default dossiers;
