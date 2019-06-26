import React from 'react';
import { render } from '@testing-library/react';
import ChercherAdresse from './ChercherAdresse';

test('rendering ChercherAdresse component', () => {
  const andeville = {
    nom: 'Andeville',
    position: [49.258172, 2.1673],
    code: '60012'
  };
  function onClickSelectAddress(suggestion) {
    return;
  }
  function resetCommune() {
    return;
  }
  function setErreur() {
    return;
  }
  const { queryAllByText } = render(
    <ChercherAdresse
      commune={andeville}
      onClickSelectAddress={onClickSelectAddress}
      resetCommune={resetCommune}
      setErreur={setErreur}
    />
  );
  expect(queryAllByText('Localiser')).toBeTruthy();
});
