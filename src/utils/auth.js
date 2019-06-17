// import jwtDecode from 'jwt-decode';
import { now } from 'moment';
import api from 'utils/api';
import sessionStorage from 'utils/session-storage';
import { BehaviorSubject } from 'rxjs';
import crypto from 'crypto';

const keyToken = 'fake-jwt-token';
const keyNonce = 'nonce';
const keyUser = 'user';

const token = new BehaviorSubject(loadToken());
const user = new BehaviorSubject(loadUser());

function tokenValue() {
  return token.value;
}
function userValue() {
  return user.value;
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

function deleteNonce() {
  sessionStorage.remove(keyNonce);
}

function loadToken() {
  return sessionStorage.load(keyToken);
}

function loadNonce() {
  return sessionStorage.load(keyNonce);
}

function loadUser() {
  return sessionStorage.load(keyUser);
}

function saveToken(payload) {
  sessionStorage.save(keyToken, payload);
  token.next(payload);
}

function saveUser(payload) {
  sessionStorage.save(keyUser, payload);
  user.next(payload);
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
  if (userValue()) user = JSON.parse(userValue());
  return user;
}

function getAcrFromIdToken(idToken) {
  return JSON.parse(
    Buffer.from(idToken.split('.')[1], 'base64').toString('utf8')
  ).acr;
}

function isAuthenticated() {
  var authenticated = false;
  if (tokenValue()) authenticated = !hasTokenExpired(tokenValue());
  return authenticated;
}

function login(email, password) {
  return api.auth
    .login(email, password)
    .then(api.handleResponse)
    .then(data => {
      saveNonce();
      saveToken(JSON.stringify(data.token));
      saveUser(JSON.stringify(data.user));
      return { token: data.token, user: data.user, isAuthenticated: true };
    });
}

function logout() {
  return api.auth
    .logout()
    .then(api.handleResponse)
    .then(data => {
      deleteToken();
      deleteNonce();
      return data;
    });
}

function register(firstName, lastName, email, password) {
  return api.auth
    .register(firstName, lastName, email, password)
    .then(api.handleResponse)
    .then(data => {
      return { user: data };
    });
}

function reset(email) {
  return api.auth
    .reset(email)
    .then(api.handleResponse)
    .then(data => {
      return { user: data };
    });
}

function confirm(idToken) {
  return api.auth
    .confirm(idToken)
    .then(api.handleResponse)
    .then(data => {
      return data;
    });
}

function changePassword(idToken, password) {
  return api.auth
    .changePassword(idToken, password)
    .then(api.handleResponse)
    .then(data => {
      return data;
    });
}

function getFranceConnectURL() {
  saveNonce();
  const nonce = loadNonce();
  return `${
    process.env.REACT_APP_FRANCE_CONNECT_URL
  }authorize?redirect_uri=${process.env.REACT_APP_PUBLIC_URL +
    '/login-callback'}&scope=${'openid given_name family_name'}&client_id=${
    process.env.REACT_APP_FRANCE_CONNECT_CLIENT_ID
  }&state=home&nonce=${nonce}&acr_values=eidas1&response_type=code`;
}

function getFranceConnectLogoutURL(idToken) {
  return (
    `${process.env.REACT_APP_FRANCE_CONNECT_URL}logout?id_token_hint=` +
    `${idToken}&state=customState11&post_logout_redirect_uri=${process.env
      .REACT_APP_PUBLIC_URL + '/logout-callback'}`
  );
}

function loginCallback(code, state) {
  return api.auth
    .loginCallback(code, state)
    .then(api.handleResponse)
    .then(data => {
      saveToken(JSON.stringify(data.token));
      return {
        id: data.id_token,
        user: data.user,
        acr: getAcrFromIdToken(data.id_token),
        isAuthenticated: true
      };
    });
}

const auth = {
  login,
  logout,
  register,
  reset,
  confirm,
  changePassword,
  isAuthenticated,
  hasTokenExpired,
  getProfile,
  getUser,
  token: token.asObservable(),
  tokenValue,
  getFranceConnectURL,
  loginCallback,
  getFranceConnectLogoutURL
};

export default auth;
