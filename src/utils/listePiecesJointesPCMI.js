const listePiecesJointesPCMI = [
  {
    code: 'pcmicerfa',
    titre: 'CERFA 13406-06',
    description:
      'Demande de Permis de construire pour une maison individuelle et/ou ses annexes comprenant ou non des démolitions',
    formats: 'application/pdf',
    required: true
  },
  {
    code: 'pcmi1',
    titre: 'PCMI1 - Plan de situation',
    description:
      'Un plan de situation du terrain [Art. R. 431-7 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi2',
    titre: 'PCMI2 - Plan de masse',
    description:
      'Un plan de masse des constructions à édifier ou à modifier [Art. R. 431-9 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi3',
    titre: 'PCMI3 - Plan de coupe',
    description:
      'Un plan en coupe du terrain et de la construction [Article R. 431-10 b) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi4',
    titre: 'PCMI4 - Notice descriptive',
    description:
      'Une notice décrivant le terrain et présentant le projet [Art. R. 431-8 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi5',
    titre: 'PCMI5 - Plan des façades',
    description:
      'Un plan des façades et des toitures [Art. R. 431-10 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi6',
    titre: "PCMI6 - Document graphique d'insertion",
    description:
      'Un document graphique permettant d’apprécier l’insertion du projet de construction dans son environnement [Art. R. 431-10 c) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi7',
    titre: 'PCMI7 - Photo de situation proche ',
    description:
      'Une photographie permettant de situer le terrain dans l’environnement proche [Art. R. 431-10 d) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi8',
    titre: 'PCMI8 - Photo de situation lointaine',
    description:
      'Une photographie permettant de situer le terrain dans le paysage lointain [Art. R. 431-10 d) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi9',
    titre: 'PCMI9 - Certificat surface constructible',
    description:
      'Le certificat indiquant la surface constructible attribuée à votre lot [Art. R. 442-11 1er al du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi10',
    titre: 'PCMI10 - Certificat achèvement des équipements',
    description:
      'Le certificat attestant l’achèvement des équipements desservant le lot [Art. R. 431-22-1 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi11',
    titre: 'PCMI11 - Cahier des charges de cession du terrain',
    description:
      'Une copie des dispositions du cahier des charges de cession de terrain qui indiquent le codebre de m² constructibles sur la parcelle et, si elles existent, des dispositions du cahier des charges, qui fixent les prescriptions techniques, urbanistiques et architecturales imposées pour la durée de réalisation de la zone [Art. R. 431-23 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi12',
    titre:
      'PCMI12 - Convention participation au coût des équipements collectifs',
    description:
      'La convention entre la commune ou l’établissement public et vous qui fixe votre participation au coût des équipements de la zone [Art. R. 431-23 b) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi12-1',
    titre: 'PCMI12-1 - Dossier évaluation des incidences',
    description:
      'Le dossier d’évaluation des incidences prévu à l’art. R. 414-23 du code de l’environnement [Art. R.431-16 c) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi12-2',
    titre: 'PCMI12-2 - Attestation conformité',
    description:
      'L’attestation de conformité du projet d’installation [Art. R.431-16 d) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi13',
    titre: 'PCMI13 - Attestation contrôleur technique',
    description:
      'L’attestation d’un contrôleur technique [Art. R. 431-16 e) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi14',
    titre: 'PCMI14 - Attestation architecte',
    description:
      'L’attestation de l’architecte ou de l’expert certifiant que l’étude a été réalisée et que le projet la prend en compte [Art. R. 431-16 f) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi14-1',
    titre: 'PCMI14-1 - Attestation réglementation thermique',
    description:
      'Le formulaire attestant la prise en compte de la réglementation thermique [Art. R. 431-16 j) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi15',
    titre: 'PCMI15 - Attestation exemplarité environnementale',
    description:
      'Un document prévu par l’article R. 111-21 du code de la construction et de l’habitation attestant que la construction fait preuve d’exemplarité énergétique ou d’exemplarité environnementale ou est à énergie positive selon les critères définis par ces dispositions [Art. R. 431-18 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi16',
    titre: 'PCMI16 - Document engagement R. 111-23',
    description:
      'Un document par lequel le demandeur s’engage à installer des dispositifs conformes aux dispositions de l’arrêté prévu au 2° de l’article R. 111-23 [Art. R. 431-18-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi17',
    titre: 'PCMI17 - Lettre du préfet sur défrichement',
    description:
      'La copie de la lettre du préfet qui vous fait savoir que votre demande d’autorisation de défrichement est complète, si le défrichement est ou non soumis à reconnaissance de la situation et de l’état des terrains et si la demande doit ou non faire l’objet d’une enquête publique [Art. R. 431-19 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi18',
    titre: 'PCMI18 - Justificatif dépôt permis de démolir',
    description:
      'La justification du dépôt de la demande de permis de démolir [Art. R. 431-21 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi19',
    titre: 'PCMI19 - Pièces jointes au permis de démolir',
    description:
      'Les pièces à joindre à une demande de permis de démolir, selon l’Annexe ci-jointe [Art. R. 431-21 b) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi20',
    titre: 'PCMI20 - Accord gestionnaire domaine public',
    description:
      'L’accord du gestionnaire du domaine pour engager la procédure d’autorisation d’occupation temporaire du domaine public [Art. R. 431-13 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi21',
    titre: 'PCMI21 - Notice matérieaux',
    description:
      'Une notice faisant apparaître les matériaux utilisés et les modalités d’exécution des travaux [Art. R. 431-14 et R. 431-14-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi21-1',
    titre: 'PCMI21-1 - Dossier R. 331-19',
    description:
      'Le dossier prévu au II de l’article R. 331-19 du code de l’environnement [Art. R. 431-14-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi22',
    titre: 'PCMI22 - Plan situation stationnements',
    description:
      ' Le plan de situation du terrain sur lequel seront réalisées les aires de stationnement et le plan des constructions et des aménagements correspondants [Art. R. 431-26 a) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi23',
    titre: 'PCMI23 - Promesse concession',
    description:
      ' La promesse synallagmatique de concession ou d’acquisition [Art. R. 431-26 b) du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi23-1',
    titre: 'PCMI23-1 - Note dérogation accessibilité',
    description:
      'Une note précisant la nature des travaux pour lesquels une dérogation est sollicitée et justifiant que ces travaux sont nécessaires pour permettre l’accessibilité du logement à des personnes handicapées [Art. R. 431-31 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi23-2',
    titre: 'PCMI23-2 - Demande dérogation R. 111-1-2',
    description:
      'Une demande de dérogation comprenant les précisions et les justifications définies à l’article R. 111-1-2 du code de la construction et de l’habitation [Art. R. 431-31-1 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi23-3',
    titre: 'PCMI23-3 - Note dérogations Art. R. 431-31-2',
    description:
      'Une note précisant la nature de la ou des dérogations demandées justifiant du respect des objectifs et des conditions fixées aux articles L. 151-29-1 et L. 152-6 du code de l’urbanisme pour chacune des dérogations demandées. [Art. R. 431-31-2 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi24',
    titre: 'PCMI24 - Contrat servitudes',
    description:
      'Une copie du contrat ou de la décision judiciaire relatifs à l’institution de ces servitudes [Art. R. 431-32 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi25',
    titre: 'PCMI25 - Contrat transfert COS',
    description:
      'Une copie du contrat ayant procédé au transfert des possibilités de construction résultant du COS [Art. R. 431-33 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  },
  {
    code: 'pcmi26',
    titre: 'PCMI26 - Extrait convention projet urbain partenarial',
    description:
      'L’extrait de la convention précisant le lieu du projet urbain partenarial et la durée d’exonération de la taxe d’aménagement [Art. R. 431-23-2 du code de l’urbanisme]',
    formats: 'application/pdf,image/*',
    required: false
  }
];

export { listePiecesJointesPCMI };
