import React from 'react';
import DeposeIcon from '@material-ui/icons/CloudDownload';
import QualifieIcon from '@material-ui/icons/Assignment';
import IncompletIcon from '@material-ui/icons/AssignmentReturn';
import InstructionIcon from '@material-ui/icons/AssignmentInd';
import CompletIcon from '@material-ui/icons/AssignmentTurnedIn';

const steps = [
  {
    id: 'DEPOSE',
    variant: 'info',
    icon: <DeposeIcon />
  },
  {
    id: 'QUALIFIE',
    variant: 'warning',
    icon: <QualifieIcon />
  },
  {
    id: 'INCOMPLET',
    variant: 'error',
    icon: <IncompletIcon />
  },
  {
    id: 'INSTRUCTION',
    variant: 'info',
    icon: <InstructionIcon />
  },
  {
    id: 'COMPLET',
    variant: 'success',
    icon: <CompletIcon />
  },
  {
    id: 'CONSULTATIONS',
    variant: 'info',
    icon: <InstructionIcon />
  },
  {
    id: 'DECISION',
    variant: 'success',
    icon: <CompletIcon />
  }
];

function dossierWorkflow(dossier) {
  const statutsSuivants = dossier.statutsRestants;
  const instruit = emptyWorkflow().find(s => s.id === 'INSTRUCTION');
  if (dossier.statutActuel.id === 'INCOMPLET')
    statutsSuivants.splice(0, 0, instruit);
  const concat_array = [...dossier.statuts, ...statutsSuivants];
  return concat_array;
}

function emptyWorkflow() {
  const emptyWorkflow = steps.filter(step => step.id !== 'INCOMPLET');
  return emptyWorkflow;
}

export { dossierWorkflow };
export { emptyWorkflow };

export default steps;
