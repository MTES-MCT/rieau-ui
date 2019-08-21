# RIEAU UI

[![CircleCI](https://circleci.com/gh/MTES-MCT/rieau-ui/tree/master.svg?style=svg)](https://circleci.com/gh/MTES-MCT/rieau-ui/tree/master)

> Frontend de RIEAU

## Développement

### Prérequis

* Nodejs 10.15.3+ installé par exemple avec [asdf nodejs](https://github.com/asdf-vm/asdf-nodejs) avec les clés PGP importées au préalable.

Ce projet a été construit avec [Create React App](https://github.com/facebook/create-react-app).

### Local

Copier le `.env.sample` en `.env`.

Modifier dans le fichier les valeurs en fonction de l'environnement (par exemple `REACT_APP_API_MOCK=true` permet de désactiver l'API), puis lancer le serveur:

```shell
REACT_APP_API_MOCK=true
REACT_APP_DOMAIN=http://localhost:3000
PUBLIC_URL=http://localhost:3000
```

```shell
npm start
```

Depuis le navigateur: [http://localhost:3000](http://localhost:3000).

### Formatage du code

```shell
npm run prettier
```

### Correction du code

```shell
npm run lint
```

### Analyser la taille du bundle

```shell
npm run build
npm run analyze
```

### Tests unitaires

```shell
npm run test:unit
```

### Tests intégration

* Pour éditer les tests avec l'API mockée (`REACT_APP_API_MOCK=true`):

On configure le fichier `.env` avec `REACT_APP_API_MOCK=true`.

On lance le serveur:

```shell
npm start
```

Puis on ouvre le studio [Cypress](https://cypress.io):

```shell
REACT_APP_API_MOCK=true npm run cypress:open
```

* Pour exécuter les tests et enregistrer les videos et screenshots:

```shell
REACT_APP_API_MOCK=true npm run test:integration
```

Si on souhaite les exécuter avec l'API réelle, on exécute au préalable la stack du backend (cf. [rieau-infra](https://github.com/MTES-MCT/rieau-infra/blob/master/README.md)).

Puis on configure le fichier `.env` afin d'appeler le backend: 

```shell
REACT_APP_API_MOCK=false
REACT_APP_DOMAIN=http://localhost:3000
PUBLIC_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SSO_APP_URL=http://localhost:8080/auth
REACT_APP_SSO_APP_REALM=rieau
REACT_APP_SSO_APP_CLIENT_ID=rieau-ui
```

Enfin on exécute les tests en précisant que l'API est réelle:

```shell
REACT_APP_API_MOCK=false npm run test:integration
```

Ou pour les éditer avec le studio: 

```shell
REACT_APP_API_MOCK=false npm run cypress:open
```

### Pour aller plus loin

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

* [React documentation](https://reactjs.org/).

## Déploiements

Copier le `.env.sample` en `.env`.

Surcharger dans le shell les valeurs en fonction de l'environnement, puis construire:

```shell
npm run build
```

### Github pages

Depuis la branche `master`:

```shell
REACT_APP_API_MOCK=true PUBLIC_URL="https://mtes-mct.github.io/rieau-ui" npm run deploy
```

Depuis le navigateur: [https://mtes-mct.github.io/rieau-ui/](https://mtes-mct.github.io/rieau-ui/).

### Docker

* Build:

Pour une image configurable au runtime, modifier le `.env`:

```shell
PUBLIC_URL=___PUBLIC_URL___
```

Seul le path est modifiable au build en ajoutant: `--build-arg REACT_APP_BASENAME=/path`.

Ensuite construiser l'image:

```shell
docker build -t tristanrobert/rieau-ui .
```

* Run:

Il est possible de changer à l'exécution des variables d'environnement comme `SERVER_PORT`, le port d'écoute HTTP de NGINX par défaut à 3000, ou celles de l'application REACT comme `REACT_APP_API_URL` (cf. `.env.sample`).

Par exemple, spécifier `PUBLIC_URL` si le site est installé sur un autre domaine.

```shell
docker run -p 3000:3000 -e SERVER_PORT=3000 -e PUBLIC_URL=http://rieau.docker.localhost -e REACT_APP_API_URL=http://rieau.docker.localhost/api -e REACT_APP_SSO_APP_URL=http://sso.rieau.docker.localhost:8080/auth --name rieau-ui -d -t tristanrobert/rieau-ui
```

Seule `REACT_APP_BASENAME` n'est pas modifiable à l'exécution mais seulement au build (car utilisée par nginx comme répertoire).

Depuis le navigateur: [http://localhost:3000](http://localhost:3000).
