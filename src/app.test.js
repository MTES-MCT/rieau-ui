import React from 'react';
import App from './app';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { cleanup, render, waitForElement } from '@testing-library/react';
import Localiser from 'pages/protected/Localiser';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';
import Home from 'pages/Home';
import { UserProvider } from 'context/user-context';
import { AuthProvider } from 'context/auth-context';

afterEach(cleanup);

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  // https://github.com/testing-library/react-testing-library/issues/281
  return {
    ...render(
      <AuthProvider>
        <UserProvider>
          <Router history={history}>{ui}</Router>
        </UserProvider>
      </AuthProvider>
    ),
    history
  };
}

const nomAppli = "RIE'AU";

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
