import { listePiecesJointesDP } from 'utils/listePiecesJointesDP';
import { listePiecesJointesPCMI } from 'utils/listePiecesJointesPCMI';

function liste(typeDemande) {
  switch (typeDemande) {
    case 'dp':
      return listePiecesJointesDP;
    case 'pcmi':
      return listePiecesJointesPCMI;
    default:
      return [];
  }
}

function type(typeDemande) {
  switch (typeDemande) {
    case 'dp':
      return 'Déclaration préalable de travaux';
    case 'pcmi':
      return 'Demande de permis de construire pour une maison individuelle';
    default:
      return '';
  }
}

export { liste };
export { type };
