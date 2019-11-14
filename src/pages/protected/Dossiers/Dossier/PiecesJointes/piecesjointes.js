import { listePiecesJointesDPMI } from 'pages/protected/Dossiers/Dossier/PiecesJointes/listePiecesJointesDPMI';
import { listePiecesJointesPCMI } from 'pages/protected/Dossiers/Dossier/PiecesJointes/listePiecesJointesPCMI';

function liste(typeDemande) {
  let lowtypeDemande = typeDemande ? typeDemande.toLowerCase() : '';
  switch (lowtypeDemande) {
    case 'DPMI':
      return listePiecesJointesDPMI;
    case 'PCMI':
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
    } else if (dossier.decision && numero === dossier.decision.numero) {
      pj.fichierId = dossier.decision.fichierId;
    } else {
      let pieceJointe = dossier.piecesJointes.find(pj => pj.numero === numero);
      pj.fichierId = pieceJointe ? pieceJointe.fichierId : null;
    }
  }
  return pj;
}

function pieceJointe(dossier, numero) {
  let pj = {};
  switch (dossier.type.id) {
    case 'DPMI':
      pj = listePiecesJointesDPMI.find(pj => pj.numero === numero);
      return addDossierIdAndFichierId(pj, dossier, numero);
    case 'PCMI':
      pj = listePiecesJointesPCMI.find(pj => pj.numero === numero);
      return addDossierIdAndFichierId(pj, dossier, numero);
    default:
      return pj;
  }
}

function cerfa(dossier) {
  return pieceJointe(dossier, dossier.cerfa.numero);
}

function decision(dossier) {
  return pieceJointe(dossier, dossier.decision.numero);
}

function isCerfa(pieceJointe) {
  return pieceJointe.numero === '0';
}

function isDecision(pieceJointe) {
  return pieceJointe.numero === 'd';
}

export { liste };
export { pieceJointe };
export { cerfa };
export { isCerfa };
export { decision };
export { isDecision };
