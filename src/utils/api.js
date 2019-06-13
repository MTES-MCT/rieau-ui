const users = [
  {
    id: 'test',
    email: 'test@test.fr',
    password: 'test1234',
    firstName: 'Test',
    lastName: 'Test',
    profile: 'test'
  }
];

function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        user => user.email === email && user.password === password
      );
      if (!user)
        return resolve({
          ok: false,
          status: 400,
          body: () =>
            Promise.resolve(
              JSON.stringify({ message: 'Email ou mot de passe incorrect' })
            )
        });
      return resolve({
        ok: true,
        status: 200,
        body: () =>
          Promise.resolve(
            JSON.stringify({
              id: sessionStorage.key,
              user: user,
              expiresAt: -1
            })
          )
      });
    }, 500);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        ok: true,
        status: 200,
        body: () => Promise.resolve(JSON.stringify({}))
      });
    }, 500);
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        ok: true,
        status: 200,
        body: () => Promise.resolve(JSON.stringify({}))
      });
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
  loadUserDossiers
};

const api = {
  auth
};

export default api;
