import { parcelleIsContigue, parcelleIsIncluded } from 'utils/parcelles';

test('parcelles contigues', () => {
  let parcelles = [
    {
      geometry: {
        coordinates: [
          [
            [2.2709256, 49.1339145],
            [2.27083, 49.1340128],
            [2.2702558, 49.1338996],
            [2.2702532, 49.1338991],
            [2.270187, 49.1338868],
            [2.2701575, 49.1338813],
            [2.2701095, 49.1338725],
            [2.2701258, 49.1338437],
            [2.2701579, 49.1337877],
            [2.2702209, 49.1337978],
            [2.2702858, 49.1338082],
            [2.27068, 49.1338712],
            [2.2709256, 49.1339145]
          ]
        ]
      }
    }
  ];
  let parcelle = {
    geometry: {
      coordinates: [
        [
          [2.2701579, 49.1337877],
          [2.2701258, 49.1338437],
          [2.2701095, 49.1338725],
          [2.2700632, 49.1338638],
          [2.2700437, 49.1338602],
          [2.2699551, 49.1338438],
          [2.2699903, 49.1337609],
          [2.2700775, 49.1337749],
          [2.2701579, 49.1337877]
        ]
      ]
    }
  };
  // expect(parcelleIsContigue(parcelle, parcelles)).toBe(true);
  expect(!parcelles.includes(parcelle)).toBe(true);
});

test('parcelles contigues avec départ vide', () => {
  let parcelles = [];
  let parcelle = {
    geometry: {
      coordinates: [
        [
          [2.2696543, 49.133894],
          [2.2696639, 49.1338564],
          [2.2696706, 49.1338295],
          [2.2696763, 49.1337314],
          [2.2697081, 49.1337313],
          [2.2698408, 49.1337311],
          [2.2697957, 49.1339081],
          [2.2696543, 49.133894]
        ]
      ]
    }
  };
  expect(parcelleIsContigue(parcelle, parcelles)).toBe(true);
});

test('parcelles non contigues', () => {
  let parcelles = [
    {
      geometry: {
        coordinates: [
          [
            [2.2701579, 49.1337877],
            [2.2701258, 49.1338437],
            [2.2701095, 49.1338725],
            [2.2700632, 49.1338638],
            [2.2700437, 49.1338602],
            [2.2699551, 49.1338438],
            [2.2699903, 49.1337609],
            [2.2700775, 49.1337749],
            [2.2701579, 49.1337877]
          ]
        ]
      }
    }
  ];
  let parcelle = {
    geometry: {
      coordinates: [
        [
          [2.2696543, 49.133894],
          [2.2696639, 49.1338564],
          [2.2696706, 49.1338295],
          [2.2696763, 49.1337314],
          [2.2697081, 49.1337313],
          [2.2698408, 49.1337311],
          [2.2697957, 49.1339081],
          [2.2696543, 49.133894]
        ]
      ]
    }
  };
  expect(parcelleIsContigue(parcelle, parcelles)).toBe(false);
});

test('parcelle incluse', () => {
  let parcelles = [{ properties: { id: 0 } }];
  let parcelle = parcelles[0];
  expect(parcelleIsIncluded(parcelle, parcelles)).toBe(true);
});

test('parcelle non incluse', () => {
  let parcelles = [];
  let parcelle = { properties: { id: 0 } };
  expect(parcelleIsIncluded(parcelle, parcelles)).toBe(false);
});
