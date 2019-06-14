import React from 'react';
import App from './app';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import {
  cleanup,
  render,
  fireEvent,
  waitForElement,
  act
} from 'react-testing-library';
import Localiser from 'pages/Localiser';
import Communes from 'pages/Communes';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';
import Home from 'pages/Home';
import { UserProvider } from 'context/user-context';
import { AuthProvider } from 'context/auth-context';
import Inscription from 'pages/Inscription';
import MotDePasseOublie from 'pages/MotDePasseOublie';
import ConfirmationEmail from 'pages/ConfirmationEmail';
import ChangerMotDePasse from 'pages/ChangerMotDePasse';

afterEach(cleanup);

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  let rendered;
  act(() => {
    rendered = render(
      <AuthProvider>
        <UserProvider>
          <Router history={history}>{ui}</Router>
        </UserProvider>
      </AuthProvider>
    );
  });
  return {
    // https://github.com/testing-library/react-testing-library/issues/281q
    // ...render(<AuthProvider><UserProvider><Router history={history}>{ui}</Router></UserProvider></AuthProvider>),
    ...rendered,
    history
  };
}

const nomAppli = 'Déclaration préalable de travaux';

it('routes to Aide page', async () => {
  const { container, getByText } = renderWithRouter(<App />);
  await waitForElement(() => container.innerHTML);
  expect(container.innerHTML).toMatch(nomAppli);
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/aide/i), leftClick);
  expect(container.innerHTML).toMatch('Aide');
});

it('routes to CGU page', async () => {
  const { container, getByText } = renderWithRouter(<App />);
  await waitForElement(() => container.innerHTML);
  expect(container.innerHTML).toMatch(nomAppli);
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/cgu/i), leftClick);
  expect(container.innerHTML).toMatch('CGU');
});

it('renders nom appli message', async () => {
  const { queryAllByText } = renderWithRouter(<App />);
  await waitForElement(() => queryAllByText(nomAppli));
  expect(queryAllByText(nomAppli)).toBeTruthy();
});

it('landing on a bad page', async () => {
  const { container } = renderWithRouter(<App />, {
    route: '/something-that-does-not-match'
  });
  await waitForElement(() => container.innerHTML);
  expect(container.innerHTML).toMatch('');
});

test('rendering Aide component', async () => {
  const route = '/aide';
  const { queryAllByText } = renderWithRouter(<Aide />, { route });
  await waitForElement(() => queryAllByText('Aide'));
  expect(queryAllByText('Aide')).toBeTruthy();
});

test('rendering CGU component', async () => {
  const route = '/cgu';
  const { queryAllByText } = renderWithRouter(<Cgu />, { route });
  await waitForElement(() => queryAllByText('Aide'));
  expect(queryAllByText('Cgu')).toBeTruthy();
});

test('rendering Communes component', async () => {
  const route = '/communes';
  const { queryAllByText } = renderWithRouter(<Communes />, { route });
  await waitForElement(() => queryAllByText('Communes'));
  expect(queryAllByText('Communes')).toBeTruthy();
});

test('rendering Localiser component', async () => {
  const route = '/localiser';
  const { queryAllByText } = renderWithRouter(<Localiser />, { route });
  await waitForElement(() => queryAllByText('Localiser'));
  expect(queryAllByText('Localiser')).toBeTruthy();
});
test('rendering Home component', async () => {
  const route = '/';
  const { queryAllByText } = renderWithRouter(<Home />, { route });
  await waitForElement(() => queryAllByText(nomAppli));
  expect(queryAllByText(nomAppli)).toBeTruthy();
  expect(queryAllByText('Comment faire')).toBeTruthy();
});
test('rendering Inscription component', async () => {
  const route = '/';
  const { queryAllByText } = renderWithRouter(<Inscription />, { route });
  await waitForElement(() => queryAllByText('Inscription'));
  expect(queryAllByText('Inscription')).toBeTruthy();
});
test('rendering MotDePasseOublie component', async () => {
  const route = '/';
  const { queryAllByText } = renderWithRouter(<MotDePasseOublie />, { route });
  await waitForElement(() => queryAllByText('Mot de passe oublié ?'));
  expect(queryAllByText('Mot de passe oublié ?')).toBeTruthy();
});
test('rendering ConfirmationEmail component', async () => {
  const route = '/confirmation';
  const { queryAllByText } = renderWithRouter(
    <ConfirmationEmail match={{ params: { id: '0' } }} />,
    { route }
  );
  await waitForElement(() => queryAllByText('Confirmation Email'));
  expect(queryAllByText('Confirmation Email')).toBeTruthy();
});
test('rendering ChangerDeMotDePasse component', async () => {
  const route = '/changermotdepasse';
  const { queryAllByText } = renderWithRouter(
    <ChangerMotDePasse match={{ params: { id: '0' } }} />,
    { route }
  );
  await waitForElement(() => queryAllByText('Changer de mot de passe'));
  expect(queryAllByText('Changer de mot de passe')).toBeTruthy();
});
