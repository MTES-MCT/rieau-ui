let users = [
  {
    id: 'test',
    email: 'test@test.fr',
    password: 'test1234',
    firstName: 'Test',
    lastName: 'Test',
    profile: 'test'
  }
];

function register(firstName, lastName, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existedUser = users.find(user => user.email === email);
      const newUser = {
        id: email,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        profile: 'test'
      };
      if (existedUser)
        return resolve({
          ok: false,
          status: 400,
          body: () =>
            Promise.resolve(
              JSON.stringify({ message: 'Un compte avec ce mail existe déjà' })
            )
        });

      users.push(newUser);
      window.console.log('newUser=' + JSON.stringify(newUser));
      window.console.log('users=' + JSON.stringify(users));
      return resolve({
        ok: true,
        status: 200,
        body: () => Promise.resolve(JSON.stringify(newUser))
      });
    }, 500);
  });
}

function reset(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existedUser = users.find(user => user.email === email);
      if (!existedUser)
        return resolve({
          ok: false,
          status: 400,
          body: () =>
            Promise.resolve(
              JSON.stringify({ message: "Cet email n'a pas de compte." })
            )
        });
      return resolve({
        ok: true,
        status: 200,
        body: () => Promise.resolve(JSON.stringify({}))
      });
    }, 500);
  });
}

function confirm(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const confirmations = [
        {
          id: '0',
          type: 'reset'
        },
        {
          id: '1',
          type: 'register'
        }
      ];
      const confirmation = confirmations.find(c => c.id === id);
      if (!confirmation)
        return resolve({
          ok: false,
          status: 400,
          body: () =>
            Promise.resolve(
              JSON.stringify({
                message: "Cette demande de confirmation n'existe pas."
              })
            )
        });
      return resolve({
        ok: true,
        status: 200,
        body: () => Promise.resolve(JSON.stringify({ type: confirmation.type }))
      });
    }, 500);
  });
}

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
  reset,
  confirm,
  register,
  loadUserDossiers
};

const api = {
  auth
};

export default api;
