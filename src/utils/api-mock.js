// API de test uniquement

let users = [
  {
    id: 'test',
    email: 'test@test.fr',
    password: 'test1234',
    firstName: 'Test',
    lastName: 'Test',
    profile: 'test',
    franceConnect: false
  }
];

let principal = null;

function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.length < 1)
        return reject(JSON.stringify({ message: 'Connexion impossible' }));
      return resolve((principal = users[0]));
    }, 500);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve((principal = null));
    }, 500);
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(principal !== null);
    }, 500);
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!principal)
        return reject(
          JSON.stringify({ message: "Pas d'utilisateur connecté" })
        );
      return resolve(JSON.stringify(principal));
    }, 500);
  });
}

function loadUserDossiers(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve([]);
    }, 500);
  });
}

const auth = {
  login,
  isAuthenticated,
  logout,
  getUser
};
const dossiers = {
  loadUserDossiers
};

const api = {
  auth,
  dossiers
};

export default api;
