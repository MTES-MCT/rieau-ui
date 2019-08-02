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

### Tests intégration

* Pour éditer les tests avec l'API mockée (`REACT_APP_API_MOCK=true`):

On configure le fichier `.env` avec `REACT_APP_API_MOCK=true`.

On lance le serveur:

```
npm start
```

Puis on ouvre le studio [Cypress](https://cypress.io):

```
REACT_APP_API_MOCK=true npm run cypress:open
```

* Pour exécuter les tests et enregistrer les videos et screenshots:

```
REACT_APP_API_MOCK=true npm run test:integration
```

Si on souhaite les exécuter avec l'API réelle, on exécute au préalable la stack du backend (cf. [rieau-infra](https://github.com/MTES-MCT/rieau-infra/blob/master/README.md)).

Puis on configure le fichier `.env` afin d'appeler le backend: 

```
REACT_APP_API_MOCK=false
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SSO_APP_URL=http://localhost:8080/auth
REACT_APP_SSO_APP_REALM=rieau
REACT_APP_SSO_APP_CLIENT_ID=rieau-ui
```

Enfin on exécute les tests en précisant que l'API est réelle:

```
REACT_APP_API_MOCK=false npm run test:integration
```

Ou pour les éditer avec le studio: 

```
REACT_APP_API_MOCK=false npm run cypress:open
```


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
docker build --build-arg REACT_APP_DOMAIN=http://localhost:3000 --build-arg REACT_APP_BASENAME=/dpt -t tristanrobert/rieau-ui .
```

Spécifier `REACT_APP_DOMAIN` si le site est installé sur un autre domaine que [http://localhost:3000](http://localhost:3000) par défaut et `REACT_APP_BASENAME` si il est dans un sous un sous-dossier autre que `/` (e.g. `/dpt`).

* Run:

Il est possible de changer à l'exécution des variables d'environnement comme `REACT_APP_API_URL` (cf. `.env.sample`):

```
docker run -p 3000:3000 -e REACT_APP_API_URL=http://rieau.cohesion-territoires.gouv.fr  --name rieau-ui -d -t tristanrobert/rieau-ui
```

Seule `REACT_APP_BASENAME` n'est pas modifiable à l'exécution mais seulement au build (car utilisée par nginx comme répertoire).

Depuis le navigateur: [http://localhost:3000](http://localhost:3000).
