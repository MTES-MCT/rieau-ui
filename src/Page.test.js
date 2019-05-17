import React from 'react';
import Page from './Page';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';

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
