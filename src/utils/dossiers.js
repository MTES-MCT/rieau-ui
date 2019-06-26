import api from 'utils/api';

function handleDossiers() {
  return api.then(api => {
    return api.default.dossiers;
  });
}

function loadUserDossiers() {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.loadUserDossiers();
  });
}

function savePieceJointe(nom, file, binary) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.savePieceJointe(nom, file, binary);
  });
}

function loadPieceJointe(nom) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.loadPieceJointe(nom);
  });
}

const dossiers = {
  loadUserDossiers,
  savePieceJointe,
  loadPieceJointe
};

export default dossiers;
