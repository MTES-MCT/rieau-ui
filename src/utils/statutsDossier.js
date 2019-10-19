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
    libelle: 'déclaré incomplet',
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
    libelle: 'déclaré complet',
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
    libelle: 'décision prise',
    variant: 'success',
    icon: <CompletIcon />
  }
];

function dossierWorkflow(dossier) {
  console.log('dossier.statutActuel=', JSON.stringify(dossier.statutActuel));
  console.log(
    'dossier.historiqueStatuts=',
    JSON.stringify(dossier.historiqueStatuts)
  );
  const statutsSuivants = emptyWorkflow().filter(
    s => s.ordre > dossier.statutActuel.ordre
  );
  const instruit = emptyWorkflow().find(s => s.id === 'INSTRUCTION');
  if (dossier.statutActuel.id === 'INCOMPLET')
    statutsSuivants.splice(0, 0, instruit);
  console.log('statutsSuivants=', JSON.stringify(statutsSuivants));
  const concat_array = [...dossier.historiqueStatuts, ...statutsSuivants];
  return concat_array;
}
function emptyWorkflow() {
  const emptyWorkflow = statuts.filter(statut => statut.id !== 'INCOMPLET');
  console.log('emptyWorkflow=', JSON.stringify(emptyWorkflow));
  return emptyWorkflow;
}

export { dossierWorkflow };
export { emptyWorkflow };

export default statuts;
