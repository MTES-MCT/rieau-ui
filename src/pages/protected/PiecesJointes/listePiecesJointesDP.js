const listePiecesJointesDP = [
  {
    code: 'dpcerfa',
    titre: 'CERFA 13703-06',
    description:
      'Déclaration préalable - Constructions et travaux non soumis à permis de construire portant sur une maison individuelle et/ou ses annexes',
    formats: 'application/pdf',
    required: true
  },
  {
    code: 'dp1',
    titre: 'DP1 - Plan de situation',
    description:
      'Un plan de situation du terrain [Art. R. 431-36 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp2',
    titre: 'DP2 - Plan de masse',
    description:
      'Un plan de masse coté dans les 3 dimensions [Art. R. 431-36 b) du code de l’urbanisme]. À fournir si votre projet crée une construction ou modifie le volume d’une construction existante (exemples : véranda, abri de jardin…)',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp3',
    titre: 'DP3 - Plan de coupe',
    description:
      'Un plan en coupe précisant l’implantation de la construction par rapport au profil du terrain [Art. R. 431-10b) du code de l’urbanisme]. À fournir si votre projet modifie le profil du terrain (exemple : piscine enterrée…)',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp4',
    titre: 'DP4 - Plan des façades et des toitures',
    description:
      'Un plan des façades et des toitures [Art. R. 431-10a) du code de l’urbanisme]. À fournir si votre projet les modifie (exemple : pose d’une fenêtre de toit, création d’une porte..). Inutile pour un simple ravalement de façade.',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp5',
    titre: "DP5 - Représentation de l'aspect extérieur",
    description:
      'Une représentation de l’aspect extérieur de la construction faisant apparaître les modifications projetées [Art. R. 431-36c) du code de l’urbanisme] À fournir uniquement si la pièce DP4 est insuffisante pour montrer la modification envisagée.',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp6',
    titre: "DP6 - Document graphique d'insertion",
    description:
      'Un document graphique permettant d’apprécier l’insertion du projet de construction dans son environnement [Art. R. 431-10 c du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp7',
    titre: 'DP7 - Photo de situation proche ',
    description:
      'Une photographie permettant de situer le terrain dans l’environnement proche [Art. R. 431-10 d) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp8',
    titre: 'DP8 - Photo de situation lointaine',
    description:
      'Une photographie permettant de situer le terrain dans le paysage lointain, sauf si vous justifiez qu’aucune photographie de loin n’est possible [Art. R. 431-10 d) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp8-1',
    titre: 'DP8-1 - Note des dérogations',
    description:
      'Une note précisant la nature de la ou des dérogations demandées et justifiant du respect des objectifs et des conditions fixées aux articles L. 151-29-1 et L. 152-6 du code de l’urbanisme pour chacune des dérogations demandées. [Art. R. 431-31-2 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp11',
    titre: 'DP11 - Notice des matériaux',
    description:
      'Une notice faisant apparaître les matériaux utilisés et les modalités d’exécution des travaux [Art. R. 431-14, R. 431-14-1 et R. 441-8-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp11-1',
    titre: 'DP11-1 - Dossier R331-19',
    description:
      'Le dossier prévu au II de l’article R. 331-19 du code de l’environnement [Art. R. 431-14-1 et R. 441-8-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp12-1',
    titre: 'DP12-1 - Document R111-21',
    description:
      'Un document prévu par l’article R. 111-21 du code de la construction et de l’habitation attestant que la construction fait preuve d’exemplarité énergétique ou d’exemplarité environnementale ou est à énergie positive selon les critères définis par ces dispositions [Art. R. 431-18 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp12-2',
    titre: 'DP12-2 - Dossier R111-23',
    description:
      'Un document par lequel le demandeur s’engage à installer des dispositifs conformes aux dispositions de l’arrêté prévu au 2° de l’article R. 111-23 [Art. R. 431-18-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp14',
    titre: 'DP14 - Note dérogation accessibilité',
    description:
      'Une note précisant la nature des travaux pour lesquels une dérogation est sollicitée et justifiant que ces travaux sont nécessaires pour permettre l’accessibilité du logement à des personnes handicapées [Art. R. 431-31 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp15',
    titre: 'DP15 - Contrat servitude cours communes',
    description:
      'Une copie du contrat ou de la décision judiciaire relatif à l’institution de ces servitudes [Art. R. 431-32 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp16',
    titre: 'DP16 - Contrat transfert des possibilités de construction',
    description:
      'Une copie du contrat ayant procédé au transfert des possibilités de construction résultant du coefficient d’occupation des sols [Art. R. 431-33 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp17',
    titre: 'DP17 - Graphique plan de sauvegarde et de mise en valeur',
    description:
      'Un document graphique faisant apparaître l’état initial et l’état futur de chacun des éléments ou parties faisant l’objet de travaux [Art. R .431-37 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp22',
    titre: 'DP22 - Convention projet urbain partenarial',
    description:
      'L’extrait de la convention précisant le lieu du projet urbain partenarial et la durée d’exonération de la taxe d’aménagement [Art. R. 431-23-2 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'dp23',
    titre: 'DP23 - Agrément',
    description:
      'La copie de l’agrément [Art. R. 431-16 g) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  }
];

export { listePiecesJointesDP };
