(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{629:function(e,n,r){"use strict";r.r(n);var t=r(673),o=r.n(t),u=r(690),i=r.n(u),c=r(128),s=o.a.create({baseURL:Object(c.a)("REACT_APP_API_URL"),timeout:1e3}),a=i()({url:Object(c.a)("REACT_APP_SSO_APP_URL"),realm:Object(c.a)("REACT_APP_SSO_APP_REALM"),clientId:Object(c.a)("REACT_APP_SSO_APP_CLIENT_ID")});o.a.interceptors.request.use(function(e){var n=a.token;return n&&(e.headers.Authorization="Bearer ".concat(n)),e},function(e){return Promise.reject(e)});var f={auth:{login:function(){return new Promise(function(e,n){return a.init({onLoad:"login-required"}).success(function(n){return e(n)}).error(function(e){return n(new Error(e))})})},isAuthenticated:function(){return new Promise(function(e,n){return a.init({onLoad:"check-sso"}).success(function(n){return e(n)}).error(function(e){return n(new Error(e))})})},logout:function(){return new Promise(function(e,n){return a.logout().success(function(n){return e(n)}).error(function(e){return n(new Error(e))})})},getUser:function(){return new Promise(function(e,n){return a.loadUserInfo().success(function(n){return e({firstName:n.given_name,lastName:n.family_name,email:n.email})}).error(function(e){return n(new Error(e))})})},isDepositaire:function(){return new Promise(function(e,n){return e(a.hasRealmRole("depositaire"))})},isInstructeur:function(){return new Promise(function(e,n){return e(a.hasRealmRole("instructeur"))})}},depots:{mesDepots:function(){return s.get("/depots")},savePieceJointe:function(e,n,r){return s.post("/piecesjointes",{code:e,file:n,binary:r})}}};n.default=f}}]);
//# sourceMappingURL=9.e7e1940d.chunk.js.map