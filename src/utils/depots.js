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

function statutLibelle(statut) {
  switch (statut) {
    case 'DEPOSE':
      return 'déposé';
    default:
      return '';
  }
}

const depots = {
  mesDepots,
  monDepot,
  ajouterDepot,
  supprimerDepot,
  savePieceJointe,
  lireFichier,
  statutLibelle
};

export default depots;
