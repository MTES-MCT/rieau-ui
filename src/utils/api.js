import axios from 'axios';
import querystring from 'querystring';

const franceConnectHTTPClient = axios.create({
  baseURL: process.env.REACT_APP_FRANCE_CONNECT_URL,
  timeout: 1000
});

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
let tokens = [
  {
    id: '1',
    userId: 'test',
    type: 'reset'
  },
  {
    id: '0',
    userId: 'test',
    type: 'register'
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
      const user = findUserByEmailToken(id);
      const foundToken = tokens.find(c => c.id === id);
      if (!user || !foundToken)
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
        body: () => Promise.resolve(JSON.stringify({ type: foundToken.type }))
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
              token: user.email,
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

function handleResponse(response) {
  return response.body().then(body => {
    const data = body && JSON.parse(body);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
        window.location.reload(true);
      }

      const error = data && data.message;
      return Promise.reject(error);
    }
    return data;
  });
}

function findUserByEmailToken(token) {
  const tokenFound = tokens.find(t => t.id === token);
  const userId = tokenFound ? tokenFound.userId : null;
  return users.find(user => user.id === userId);
}

function changePassword(idToken, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tokenFound = tokens.find(t => t.id === idToken);
      const user = findUserByEmailToken(idToken);
      if (!user || !tokenFound || tokenFound.type !== 'reset')
        return resolve({
          ok: false,
          status: 400,
          body: () =>
            Promise.resolve(JSON.stringify({ message: 'Token inconnu' }))
        });
      user.password = password;
      return resolve({
        ok: true,
        status: 200,
        body: () => Promise.resolve(JSON.stringify({}))
      });
    }, 500);
  });
}

function loginCallback(code, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      window.console.log('code=' + JSON.stringify(code));
      if (!code)
        return resolve({
          ok: false,
          status: 400,
          body: () =>
            Promise.resolve(
              JSON.stringify({
                message: "Echec de l'authentification par France Connect"
              })
            )
        });
      const params = {
        grant_type: 'authorization_code',
        redirect_url: `${process.env.REACT_APP_PUBLIC_URL}/login-callback`,
        client_id: process.env.REACT_APP_FRANCE_CONNECT_CLIENT_ID,
        client_secret: process.env.REACT_APP_FRANCE_CONNECT_CLIENT_SECRET,
        code: code
      };
      const reqToken = {
        method: 'POST',
        url: '/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: querystring.stringify(params)
      };
      var france_connect_token = {};
      franceConnectHTTPClient(reqToken).then(response => {
        if (!response.ok)
          return resolve({
            ok: false,
            status: 401,
            body: () =>
              Promise.resolve(
                JSON.stringify({
                  message: "Echec de l'authentification par France Connect"
                })
              )
          });
        france_connect_token = {
          id_token: response.body.id_token,
          access_token: response.body.access_token,
          exp: response.body.expires_in
        };
      });

      const reqUserInfo = {
        method: 'GET',
        url: '/userInfo?schema=openid',
        headers: {
          Authorization: `Bearer ${france_connect_token.access_token}`
        }
      };
      var user = {};
      franceConnectHTTPClient(reqUserInfo).then(response => {
        if (!response.ok)
          return resolve({
            ok: false,
            status: 400,
            body: () =>
              Promise.resolve(
                JSON.stringify({
                  message:
                    'Impossible de récupérer les infos utilisateurs de France Connect'
                })
              )
          });
        user = response.body;
      });

      return resolve({
        ok: true,
        status: 200,
        body: () =>
          Promise.resolve(
            JSON.stringify({
              id: france_connect_token.id_token,
              token: france_connect_token.access_token,
              user: user,
              expiresAt: france_connect_token.exp
            })
          )
      });
    }, 500);
  });
}

const auth = {
  login,
  loginCallback,
  isAuthenticated,
  changePassword,
  logout,
  reset,
  confirm,
  register,
  loadUserDossiers
};

const api = {
  auth,
  handleResponse
};

export default api;
