const statuts = [
  {
    id: 'DEPOSE',
    ordre: 0,
    libelle: 'déposé',
    delai: 7
  },
  {
    id: 'QUALIFIE',
    ordre: 1,
    libelle: "qualifié et l'instruction est en cours",
    delai: 30
  },
  {
    id: 'INCOMPLET',
    ordre: 2,
    libelle: 'déclaré incomplet',
    delai: 7
  },
  {
    id: 'COMPLET',
    ordre: 3,
    libelle: 'déclaré complet',
    delai: 7
  },
  {
    id: 'DECISION',
    ordre: 5,
    libelle: 'décision prise',
    delai: 7
  }
];

export default statuts;
