import React from 'react';
import DeposeIcon from '@material-ui/icons/CloudDownload';
import QualifieIcon from '@material-ui/icons/Assignment';
import IncompletIcon from '@material-ui/icons/AssignmentReturn';
import CompletIcon from '@material-ui/icons/AssignmentTurnedIn';

const steps = [
  {
    id: 'DEPOSE',
    libelle: 'déposé',
    variant: 'info',
    icon: <DeposeIcon />
  },
  {
    id: 'QUALIFIE',
    libelle: 'qualifié',
    variant: 'warning',
    icon: <QualifieIcon />
  },
  {
    id: 'INCOMPLET',
    libelle: 'incomplet',
    variant: 'error',
    icon: <IncompletIcon />
  },
  {
    id: 'COMPLET',
    libelle: 'complet',
    variant: 'success',
    icon: <CompletIcon />
  },
  {
    id: 'DECISION',
    libelle: 'décidé',
    variant: 'success',
    icon: <CompletIcon />
  }
];

function step(statutId) {
  return steps.find(step => step.id === statutId);
}

function dossierWorkflow(dossier) {
  const statutsSuivants = dossier.statutsRestants;
  const concat_array = [...dossier.statuts, ...statutsSuivants];
  return concat_array;
}

function emptyWorkflow() {
  const emptyWorkflow = steps.filter(step => step.id !== 'INCOMPLET');
  return emptyWorkflow;
}

export { dossierWorkflow };
export { emptyWorkflow };
export { step };

export default steps;
