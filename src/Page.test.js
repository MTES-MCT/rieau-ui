import React from 'react';
import Page from './Page';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';
import Localiser from 'pages/Localiser';
import Communes from 'pages/Communes';
import Cgu from 'pages/Cgu';
import Aide from 'pages/Aide';
import Home from 'pages/Home';

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

it('routes to Aide page', () => {
  const { container, getByText } = renderWithRouter(<Page />);
  expect(container.innerHTML).toMatch('Permis de construire facile');
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/aide/i), leftClick);
  expect(container.innerHTML).toMatch('Aide');
});

it('routes to CGU page', () => {
  const { container, getByText } = renderWithRouter(<Page />);
  expect(container.innerHTML).toMatch('Permis de construire facile');
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/cgu/i), leftClick);
  expect(container.innerHTML).toMatch('CGU');
});

it('renders Permis de construire facile message', () => {
  const { queryAllByText } = render(<Page />);
  expect(queryAllByText('Permis de construire facile')).toBeTruthy();
});

it('landing on a bad page', () => {
  const { container } = renderWithRouter(<Page />, {
    route: '/something-that-does-not-match'
  });
  expect(container.innerHTML).toMatch('');
});

test('rendering Aide component', () => {
  const route = '/aide';
  const { queryAllByText } = renderWithRouter(<Aide />, { route });
  expect(queryAllByText('Aide')).toBeTruthy();
});

test('rendering CGU component', () => {
  const route = '/cgu';
  const { queryAllByText } = renderWithRouter(<Cgu />, { route });
  expect(queryAllByText('Cgu')).toBeTruthy();
});

test('rendering Communes component', () => {
  const route = '/communes';
  const { queryAllByText } = renderWithRouter(<Communes />, { route });
  expect(queryAllByText('Communes')).toBeTruthy();
});

test('rendering Home component', () => {
  const route = '/';
  const { queryAllByText } = renderWithRouter(<Home />, { route });
  expect(queryAllByText('Permis construire facile')).toBeTruthy();
  expect(queryAllByText('Comment faire')).toBeTruthy();
});
