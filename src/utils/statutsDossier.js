import React from 'react';
import DeposeIcon from '@material-ui/icons/CloudDownload';
import QualifieIcon from '@material-ui/icons/Assignment';
import IncompletIcon from '@material-ui/icons/AssignmentReturn';
import InstructionIcon from '@material-ui/icons/AssignmentInd';
import CompletIcon from '@material-ui/icons/AssignmentTurnedIn';

const statuts = [
  {
    id: 'DEPOSE',
    ordre: 0,
    libelle: 'déposé',
    variant: 'info',
    icon: <DeposeIcon />
  },
  {
    id: 'QUALIFIE',
    ordre: 1,
    libelle: 'qualifié',
    variant: 'warning',
    icon: <QualifieIcon />
  },
  {
    id: 'INCOMPLET',
    ordre: 2,
    libelle: 'incomplet',
    variant: 'error',
    icon: <IncompletIcon />
  },
  {
    id: 'INSTRUCTION',
    ordre: 2,
    libelle: 'instruit',
    variant: 'info',
    icon: <InstructionIcon />
  },
  {
    id: 'COMPLET',
    ordre: 3,
    libelle: 'complet',
    variant: 'success',
    icon: <CompletIcon />
  },
  {
    id: 'CONSULTATIONS',
    ordre: 4,
    libelle: 'consulté',
    variant: 'info',
    icon: <InstructionIcon />
  },
  {
    id: 'DECISION',
    ordre: 5,
    libelle: 'décidé',
    variant: 'success',
    icon: <CompletIcon />
  }
];

function mergeStatuts(dossier) {
  const initStatuts = statuts.filter(statut => statut.id !== 'INCOMPLET');
  const concat_array = [...initStatuts, ...dossier.historiqueStatuts];
  const union = [...new Set(concat_array)];
  return union;
}

export { mergeStatuts };

export default statuts;
