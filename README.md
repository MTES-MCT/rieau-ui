# Permis construire facile UI
[![CircleCI](https://circleci.com/gh/MTES-MCT/permis-construire-facile-ui/tree/master.svg?style=svg)](https://circleci.com/gh/MTES-MCT/permis-construire-facile-ui/tree/master)

> Frontend de permis construire facile

## Développement

### Prérequis

* Nodejs 10.15.3+ installé par exemple avec [asdf nodejs](https://github.com/asdf-vm/asdf-nodejs) avec les clés PGP importées au préalable.

Ce projet a été construit avec [Create React App](https://github.com/facebook/create-react-app).

### Local

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

### Pour aller plus loin

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

* [React documentation](https://reactjs.org/).

## Déploiements

### Github pages

Depuis la branche `master`:

```
REACT_APP_BASENAME=/permis-construire-facile-ui PUBLIC_URL="https://mtes-mct.github.io/permis-construire-facile-ui" npm run deploy
```

Depuis le navigateur: [https://mtes-mct.github.io/permis-construire-facile-ui/](https://mtes-mct.github.io/permis-construire-facile-ui/).

### Docker

* Build:

```
docker build --build-arg REACT_APP_DOMAIN=http://localhost:3000 --build-arg REACT_APP_BASENAME=/pcf2 -t permis-construire-facile-ui .
```

Spécifier `REACT_APP_DOMAIN` si le site est installé sur un autre domaine que [http://localhost:3000](http://localhost:3000) par défaut et et `REACT_APP_BASENAME` si il est dans un sous un sous-dossier autre que `/` (e.g. `/pcf2`).

* Run:

```
docker run -p 3000:3000 permis-construire-facile-ui
```

Depuis le navigateur: [http://localhost:3000](http://localhost:3000).
