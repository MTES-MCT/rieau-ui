import { listePiecesJointesDPMI } from 'utils/listePiecesJointesDPMI';
import { listePiecesJointesPCMI } from 'utils/listePiecesJointesPCMI';

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
    case 'DPMI':
      pj = listePiecesJointesDPMI.find(pj => pj.numero === numero);
      console.log('pj=', JSON.stringify(pj));
      return addDossierIdAndFichierId(pj, dossier, numero);
    case 'PCMI':
      pj = listePiecesJointesPCMI.find(pj => pj.numero === numero);
      console.log('pj=', JSON.stringify(pj));
      return addDossierIdAndFichierId(pj, dossier, numero);
    default:
      return pj;
  }
}

function isCerfa(pieceJointe) {
  return pieceJointe.numero === '0';
}

export { liste };
export { pieceJointe };
export { isCerfa };
