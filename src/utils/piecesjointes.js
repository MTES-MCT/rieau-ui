import { listePiecesJointesDP } from 'utils/listePiecesJointesDP';
import { listePiecesJointesPCMI } from 'utils/listePiecesJointesPCMI';

function liste(typeDemande) {
  let lowtypeDemande = typeDemande ? typeDemande.toLowerCase() : '';
  switch (lowtypeDemande) {
    case 'dp':
      return listePiecesJointesDP;
    case 'pcmi':
      return listePiecesJointesPCMI;
    default:
      return [];
  }
}

function addDepotIdAndFichierId(pj, depot, numero) {
  if (pj) {
    pj.depotId = depot.id;
    if (numero === depot.cerfa.numero) {
      pj.fichierId = depot.cerfa.fichierId;
    } else {
      let pieceJointe = depot.piecesJointes.find(pj => pj.numero === numero);
      pj.fichierId = pieceJointe ? pieceJointe.fichierId : null;
    }
  }
  return pj;
}

function pieceJointe(depot, numero) {
  let typeDepot = depot.type ? depot.type.toLowerCase() : '';
  let pj = {};
  switch (typeDepot) {
    case 'dp':
      pj = listePiecesJointesDP.find(pj => pj.numero === numero);
      return addDepotIdAndFichierId(pj, depot, numero);
    case 'pcmi':
      pj = listePiecesJointesPCMI.find(pj => pj.numero === numero);
      return addDepotIdAndFichierId(pj, depot, numero);
    default:
      return [];
  }
}

function typeLibelle(typeDemande) {
  let lowtypeDemande = typeDemande ? typeDemande.toLowerCase() : '';
  switch (lowtypeDemande) {
    case 'dp':
      return 'Déclaration préalable de travaux';
    case 'pcmi':
      return 'Demande de permis de construire pour une maison individuelle';
    default:
      return '';
  }
}

function isCerfa(pieceJointe) {
  return pieceJointe.numero === '0';
}

export { liste };
export { typeLibelle };
export { pieceJointe };
export { isCerfa };
