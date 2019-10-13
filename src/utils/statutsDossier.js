import React from 'react';
import DeposeIcon from '@material-ui/icons/CloudDownload';
import QualifieIcon from '@material-ui/icons/Assignment';
import IncompletIcon from '@material-ui/icons/AssignmentReturn';
import InstructionIcon from '@material-ui/icons/AssignmentInd';
import CompletIcon from '@material-ui/icons/AssignmentTurnedIn';

const statuts = [
  {
    id: 'DEPOSE',
    order: 0,
    label: 'déposé',
    variant: 'info',
    icon: <DeposeIcon />
  },
  {
    id: 'QUALIFIE',
    order: 1,
    label: 'qualifié',
    variant: 'warning',
    icon: <QualifieIcon />
  },
  {
    id: 'INCOMPLET',
    order: 2,
    label: 'incomplet',
    variant: 'error',
    icon: <IncompletIcon />
  },
  {
    id: 'INSTRUCTION',
    order: 3,
    label: 'instruction',
    variant: 'info',
    icon: <InstructionIcon />
  },
  {
    id: 'COMPLET',
    order: 4,
    label: 'complété',
    variant: 'success',
    icon: <CompletIcon />
  }
];

export default statuts;
