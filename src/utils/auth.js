// import jwtDecode from 'jwt-decode';
import { now } from 'moment';
import api from 'utils/api';
import sessionStorage from 'utils/session-storage';
import { BehaviorSubject } from 'rxjs';
import crypto from 'crypto';

const keyToken = 'fake-jwt-token';
const keyNonce = 'nonce';

const token = new BehaviorSubject(loadToken());

function tokenValue() {
  return token.value;
}

function randomString(length) {
  var charset =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
  let result = '';

  while (length > 0) {
    var bytes = new Uint8Array(16);
    var random = crypto.randomBytes(bytes.length);

    // eslint-disable-next-line no-loop-func
    random.forEach(function(c) {
      if (length === 0) {
        return;
      }
      if (c < charset.length) {
        result += charset[c];
        length--;
      }
    });
  }
  return result;
}

function saveNonce() {
  sessionStorage.save(keyNonce, randomString(16));
}

// function loadNonce() {
//   return sessionStorage.load(keyNonce);
// }

function deleteNonce() {
  sessionStorage.remove(keyNonce);
}

function loadToken() {
  return sessionStorage.load(keyToken);
}

function saveToken(payload) {
  sessionStorage.save(keyToken, payload);
  token.next(payload);
}

function deleteToken() {
  sessionStorage.remove(keyToken);
  token.next(null);
}

function hasTokenExpired(payload) {
  if (payload.expiresAt < 0) return false;
  return now() - payload.expiresAt >= 0;
}

// function isTokenValid(payload) {
//   // let jwt = jwtDecode(token);
//   let jwt = payload;
//   return jwt.nonce === loadNonce();
// }

function getProfile() {
  if (!getUser()) return '';
  return getUser().profile;
}

function getUser() {
  var user = null;
  if (tokenValue()) user = JSON.parse(tokenValue()).user;
  return user;
}

// function getIdToken() {
//   return keyToken;
// }

function isAuthenticated() {
  var authenticated = false;
  if (tokenValue()) authenticated = !hasTokenExpired(tokenValue());
  return authenticated;
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

function login(email, password) {
  return api.auth
    .login(email, password)
    .then(handleResponse)
    .then(data => {
      saveNonce();
      saveToken(JSON.stringify(data));
      return { user: data, isAuthenticated: true };
    });
}

function logout() {
  return api.auth
    .logout()
    .then(handleResponse)
    .then(data => {
      deleteToken();
      deleteNonce();
      return data;
    });
}

const auth = {
  login,
  logout,
  isAuthenticated,
  hasTokenExpired,
  getProfile,
  getUser,
  token: token.asObservable(),
  tokenValue
};

export default auth;
