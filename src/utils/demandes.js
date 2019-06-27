import api from 'utils/api';

function handleDemandes() {
  return api.then(api => {
    return api.default.demandes;
  });
}

function mesDemandes() {
  return api.then(handleDemandes).then(demandes => {
    return demandes.mesDemandes();
  });
}

function savePieceJointe(code, file, binary) {
  return api.then(handleDemandes).then(demandes => {
    return demandes.savePieceJointe(code, file, binary);
  });
}

function loadPieceJointe(code) {
  return api.then(handleDemandes).then(demandes => {
    return demandes.loadPieceJointe(code);
  });
}

const demandes = {
  mesDemandes,
  savePieceJointe,
  loadPieceJointe
};

export default demandes;
