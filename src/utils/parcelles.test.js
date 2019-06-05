import {
  parcelleIsContigue,
  parcelleIsIncluded,
  parcelleCenter
} from 'utils/parcelles';

// https://github.com/Turfjs/turf/issues/1276
// test('parcelles contigues', () => {
//   let parcelles = [
//     {
//       type: 'Feature',
//       id: '95436000AA0055',
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [2.2697992, 49.1333278],
//             [2.2698112, 49.1333706],
//             [2.2698226, 49.133424],
//             [2.2698327, 49.133494],
//             [2.2697876, 49.1335049],
//             [2.2697091, 49.1335866],
//             [2.2696589, 49.1335667],
//             [2.2696277, 49.1335542],
//             [2.2695564, 49.1335292],
//             [2.2695798, 49.1335098],
//             [2.2697992, 49.1333278]
//           ]
//         ]
//       },
//       properties: {
//         id: '95436000AA0055',
//         commune: '95436',
//         prefixe: '000',
//         section: 'AA',
//         numero: '55',
//         contenance: 271,
//         created: '2009-11-24',
//         updated: '2014-02-17'
//       }
//     }
//   ];
//   let parcelle = {
//     type: 'Feature',
//     id: '95436000AA0054',
//     geometry: {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [2.2697992, 49.1333278],
//           [2.2695798, 49.1335098],
//           [2.2695564, 49.1335292],
//           [2.2695026, 49.1335079],
//           [2.2693276, 49.1334388],
//           [2.2693524, 49.133419],
//           [2.2693777, 49.1333988],
//           [2.2694088, 49.1333738],
//           [2.2694858, 49.1333125],
//           [2.2696845, 49.1331532],
//           [2.2697455, 49.1332172],
//           [2.2697738, 49.1332596],
//           [2.2697881, 49.1332909],
//           [2.2697992, 49.1333278]
//         ]
//       ]
//     },
//     properties: {
//       id: '95436000AA0054',
//       commune: '95436',
//       prefixe: '000',
//       section: 'AA',
//       numero: '54',
//       contenance: 696,
//       created: '2009-11-24',
//       updated: '2014-02-17'
//     }
//   };
//   expect(parcelleIsContigue(parcelle, parcelles)).toBe(true);
// });

test('parcelles contigues avec départ vide', () => {
  let parcelles = [];
  let parcelle = {
    type: 'Feature',
    id: '83119000AA0351',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [6.6397577, 43.2722061],
          [6.6397638, 43.2721998],
          [6.6397758, 43.272177],
          [6.6399201, 43.2721825],
          [6.6399144, 43.272192],
          [6.6399064, 43.2721922],
          [6.6398684, 43.2722486],
          [6.6397577, 43.2722061]
        ]
      ]
    },
    properties: {
      id: '83119000AA0351',
      commune: '83119',
      prefixe: '000',
      section: 'AA',
      numero: '351',
      contenance: 60,
      created: '2006-07-11',
      updated: '2017-07-17'
    }
  };
  expect(parcelleIsContigue(parcelle, parcelles)).toBe(true);
});

test('parcelles non contigues', () => {
  let parcelles = [
    {
      type: 'Feature',
      id: '83119000AA0352',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.6398289, 43.2723077],
            [6.6397501, 43.2722638],
            [6.6397183, 43.2722461],
            [6.6397577, 43.2722061],
            [6.6398684, 43.2722486],
            [6.6398289, 43.2723077]
          ]
        ]
      },
      properties: {
        id: '83119000AA0352',
        commune: '83119',
        prefixe: '000',
        section: 'AA',
        numero: '352',
        contenance: 68,
        created: '2006-07-11',
        updated: '2017-07-17'
      }
    },
    {
      type: 'Feature',
      id: '83119000AA0351',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.6397577, 43.2722061],
            [6.6397638, 43.2721998],
            [6.6397758, 43.272177],
            [6.6399201, 43.2721825],
            [6.6399144, 43.272192],
            [6.6399064, 43.2721922],
            [6.6398684, 43.2722486],
            [6.6397577, 43.2722061]
          ]
        ]
      },
      properties: {
        id: '83119000AA0351',
        commune: '83119',
        prefixe: '000',
        section: 'AA',
        numero: '351',
        contenance: 60,
        created: '2006-07-11',
        updated: '2017-07-17'
      }
    }
  ];
  let parcelle = {
    type: 'Feature',
    id: '83119000AA0360',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [6.6395684, 43.2724029],
          [6.6395575, 43.2724127],
          [6.6395262, 43.2724457],
          [6.6395559, 43.2724587],
          [6.6395235, 43.2725074],
          [6.6394682, 43.2724888],
          [6.6394004, 43.2724737],
          [6.6394462, 43.2723832],
          [6.6394746, 43.2723529],
          [6.6395684, 43.2724029]
        ]
      ]
    },
    properties: {
      id: '83119000AA0360',
      commune: '83119',
      prefixe: '000',
      section: 'AA',
      numero: '360',
      contenance: 133,
      created: '2006-07-11',
      updated: '2017-07-17'
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

test('parcelle centre', () => {
  let parcelle = {
    type: 'Feature',
    id: '60463000AB0056',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [2.4373675, 49.2776439],
          [2.4375986, 49.2782254],
          [2.4376838, 49.2784603],
          [2.437994, 49.2789294],
          [2.4381428, 49.2794605],
          [2.4384342, 49.2800538],
          [2.438656, 49.2804371],
          [2.438905, 49.2810305],
          [2.4391232, 49.2816148],
          [2.4391645, 49.2817254],
          [2.4391892, 49.2817676],
          [2.4392406, 49.2818165],
          [2.4396118, 49.2822179],
          [2.4393494, 49.2822185],
          [2.4381851, 49.2822208],
          [2.4379635, 49.282936],
          [2.4372422, 49.2833264],
          [2.4351551, 49.2846337],
          [2.4359394, 49.284091],
          [2.4360485, 49.2840164],
          [2.4362952, 49.2838473],
          [2.4370908, 49.2833022],
          [2.4371428, 49.2832723],
          [2.4373849, 49.283136],
          [2.4377458, 49.2828915],
          [2.4375872, 49.2825452],
          [2.4375977, 49.2824041],
          [2.4375217, 49.2823932],
          [2.4375731, 49.2821032],
          [2.4375694, 49.2819134],
          [2.4376012, 49.2818576],
          [2.4376837, 49.2817132],
          [2.4377156, 49.2816568],
          [2.4377528, 49.2816535],
          [2.4377273, 49.2815179],
          [2.4377106, 49.2814277],
          [2.4376476, 49.2810806],
          [2.4376198, 49.2809445],
          [2.437908, 49.2809427],
          [2.4378479, 49.280678],
          [2.4377997, 49.2804527],
          [2.4377658, 49.2802947],
          [2.4377542, 49.2802401],
          [2.4377301, 49.2802404],
          [2.437691, 49.2800559],
          [2.4376501, 49.2798636],
          [2.4376318, 49.2796946],
          [2.4376217, 49.2796048],
          [2.4376074, 49.2794741],
          [2.4376626, 49.2794738],
          [2.4375836, 49.279066],
          [2.4373874, 49.2790647],
          [2.4373035, 49.2790641],
          [2.4371049, 49.2778806],
          [2.4371541, 49.2776368],
          [2.4373675, 49.2776439]
        ]
      ]
    },
    properties: {
      id: '60463000AB0056',
      commune: '60463',
      prefixe: '000',
      section: 'AB',
      numero: '56',
      contenance: 36750,
      created: '2006-12-01',
      updated: '2016-06-25'
    }
  };
  let centroid = {
    geometry: {
      coordinates: [2.4377238017857144, 49.28103317142855],
      type: 'Point'
    },
    properties: {},
    type: 'Feature'
  };
  expect(parcelleCenter(parcelle)).toStrictEqual(centroid);
});
