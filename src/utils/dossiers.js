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

function savePieceJointe(code, file, binary) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.savePieceJointe(code, file, binary);
  });
}

function loadPieceJointe(code) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.loadPieceJointe(code);
  });
}

const dossiers = {
  loadUserDossiers,
  savePieceJointe,
  loadPieceJointe
};

export default dossiers;
