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

function addDossierIdAndFichierId(pj, dossier, numero) {
  if (pj) {
    pj.DossierId = dossier.id;
    if (numero === dossier.cerfa.numero) {
      pj.fichierId = dossier.cerfa.fichierId;
    } else {
      let pieceJointe = dossier.piecesJointes.find(pj => pj.numero === numero);
      pj.fichierId = pieceJointe ? pieceJointe.fichierId : null;
    }
  }
  return pj;
}

function pieceJointe(dossier, numero) {
  let typeDossier = dossier.type.id ? dossier.type.id.toLowerCase() : '';
  if (typeDossier === '')
    typeDossier = dossier.type ? dossier.type.toLowerCase() : '';
  let pj = {};
  switch (typeDossier) {
    case 'dp':
      pj = listePiecesJointesDP.find(pj => pj.numero === numero);
      console.log('pj=', JSON.stringify(pj));
      return addDossierIdAndFichierId(pj, dossier, numero);
    case 'pcmi':
      pj = listePiecesJointesPCMI.find(pj => pj.numero === numero);
      console.log('pj=', JSON.stringify(pj));
      return addDossierIdAndFichierId(pj, dossier, numero);
    default:
      return pj;
  }
}

function typeLibelle(typeDemande) {
  let lowtypeDemande = typeDemande.id ? typeDemande.id.toLowerCase() : '';
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
