# Permis construire facile UI
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
npm run deploy
```

Depuis le navigateur: [https://mtes-mct.github.io/permis-construire-facile-ui/](https://mtes-mct.github.io/permis-construire-facile-ui/).

### Docker

* Build:

```
docker build -t permis-construire-facile-ui .
```

* Run:

```
docker run -p 3000:3000 permis-construire-facile-ui
```
