import React from 'react';
import ReactDOM from 'react-dom';
// import Page from './Page';
import * as serviceWorker from './serviceWorker';
import AppProviders from './context';
import App from 'app';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root')
);

// ReactDOM.render(<Page />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();