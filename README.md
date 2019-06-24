# RIEAU UI
[![CircleCI](https://circleci.com/gh/MTES-MCT/rieau-ui/tree/master.svg?style=svg)](https://circleci.com/gh/MTES-MCT/rieau-ui/tree/master)

> Frontend de RIEAU

## Développement

### Prérequis

* Nodejs 10.15.3+ installé par exemple avec [asdf nodejs](https://github.com/asdf-vm/asdf-nodejs) avec les clés PGP importées au préalable.

Ce projet a été construit avec [Create React App](https://github.com/facebook/create-react-app).

### Local

Copier le `.env.sample` en `.env`.


Modifier dans le fichier les valeurs en fonction de l'environnement (par exemple `REACT_APP_API_MOCK=false` permet d'activer l'API), puis lancer le serveur:

```
npm start
```

Depuis le navigateur: [http://localhost:3000](http://localhost:3000).

### Formatage du code

```
npm run prettier
```

### Correction du code

```
npm run lint
```

### Analyser la taille du bundle

```
npm run build
npm run analyze
```

### Tests unitaires

```
npm run test:unit
```

### Tests end to end

```
npm run cypress:open
```

Ouvre le studio [Cypress](https://cypress.io)

```
npm start
npm run cypress:run
```

ou

```
npm run test:e2e
```

Exécute les tests et enregistre les videos et screenshots.

### Pour aller plus loin

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

* [React documentation](https://reactjs.org/).

## Déploiements

Copier le `.env.sample` en `.env`.

Surcharger dans le shell les valeurs en fonction de l'environnement, puis construire:

```
npm run build
```

### Github pages

Depuis la branche `master`:

```
REACT_APP_BASENAME=/rieau-ui REACT_APP_DOMAIN="https://mtes-mct.github.io" npm run deploy
```

Depuis le navigateur: [https://mtes-mct.github.io/rieau-ui/](https://mtes-mct.github.io/rieau-ui/).

### Docker

* Build:

```
docker build --build-arg REACT_APP_DOMAIN=http://localhost:3000 --build-arg REACT_APP_BASENAME=/dpt -t rieau-ui .
```

Spécifier `REACT_APP_DOMAIN` si le site est installé sur un autre domaine que [http://localhost:3000](http://localhost:3000) par défaut et `REACT_APP_BASENAME` si il est dans un sous un sous-dossier autre que `/` (e.g. `/dpt`).

* Run:

```
docker run -p 3000:3000 rieau-ui
```

Depuis le navigateur: [http://localhost:3000](http://localhost:3000).
