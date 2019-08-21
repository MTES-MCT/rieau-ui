import api from 'utils/api';

function handleDepots() {
  return api.then(api => {
    return api.default.depots;
  });
}

function mesDepots() {
  return api.then(handleDepots).then(depots => {
    return depots.mesDepots();
  });
}

function monDepot(id) {
  return api.then(handleDepots).then(depots => {
    return depots.monDepot(id);
  });
}

function ajouterDepot() {
  return api.then(handleDepots).then(depots => {
    return depots.ajouterDepot();
  });
}

function savePieceJointe(code, file, binary) {
  return api.then(handleDepots).then(depots => {
    return depots.savePieceJointe(code, file, binary);
  });
}

function loadPieceJointe(code) {
  return api.then(handleDepots).then(depots => {
    return depots.loadPieceJointe(code);
  });
}

const depots = {
  mesDepots,
  monDepot,
  ajouterDepot,
  savePieceJointe,
  loadPieceJointe
};

export default depots;
