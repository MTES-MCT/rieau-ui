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

function qualifier(id) {
  return api.then(handleDepots).then(depots => {
    return depots.qualifier(id);
  });
}

function ajouterDepot(formData) {
  return api.then(handleDepots).then(depots => {
    return depots.ajouterDepot(formData);
  });
}

function supprimerDepot(id) {
  return api.then(handleDepots).then(depots => {
    return depots.supprimerDepot(id);
  });
}

function savePieceJointe(dossierId, numero, formData) {
  return api.then(handleDepots).then(depots => {
    return depots.savePieceJointe(dossierId, numero, formData);
  });
}

function lireFichier(id) {
  return api.then(handleDepots).then(depots => {
    return depots.lireFichier(id);
  });
}

const depots = {
  mesDepots,
  monDepot,
  ajouterDepot,
  supprimerDepot,
  savePieceJointe,
  lireFichier,
  qualifier
};

export default depots;
