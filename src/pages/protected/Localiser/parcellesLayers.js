import {
  parcelleIsIncluded,
  parcelleIsContigue
} from 'pages/protected/Localiser/parcelles';
import { GeoJsonLayer, TextLayer, PolygonLayer } from '@deck.gl/layers';

function parcellesUrl(commune) {
  return `https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/${commune.code}/geojson/parcelles`;
}

function retirerParcelle(parcelle, parcelles, setParcelles) {
  if (parcelleIsIncluded(parcelle, parcelles)) {
    setParcelles(parcelles.filter(p => p.id !== parcelle.id));
  }
}

function ajouterParcelle(parcelle, parcelles, setParcelles, setErreur) {
  const maxParcelles = 10;
  if (parcelles.length > maxParcelles - 1) {
    setErreur(`Maximum atteint de ${maxParcelles} parcelles.`);
  } else if (!parcelleIsContigue(parcelle, parcelles)) {
    setErreur(`La parcelle ${parcelle.properties.numero} n'est pas contiguë.`);
  } else {
    setParcelles(parcelles.concat(parcelle));
  }
}
function renderLayers(
  adresse,
  parcellesTexts,
  parcellesGeoJson,
  parcelles,
  setParcelles,
  setErreur
) {
  if (!adresse) return [];
  return [
    new GeoJsonLayer({
      id: 'parcelles-polygon-layer',
      data: parcellesGeoJson,
      filled: true,
      pickable: true,
      stroked: true,
      extruded: false,
      opacity: 0.2,
      getFillColor: d => [60, 93, 170],
      getLineColor: [60, 93, 170],
      onClick: ({ object, x, y }) => {
        ajouterParcelle(object, parcelles, setParcelles, setErreur);
      }
    }),
    new TextLayer({
      id: 'parcelles-text-layer',
      data: parcellesTexts,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      getColor: d => [0, 0, 0],
      getSize: d => 20,
      sizeScale: 1,
      opacity: 0.6,
      getPixelOffset: [0, 15]
    }),
    new PolygonLayer({
      id: 'parcelles-selectionnes-layer',
      data: parcelles,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      opacity: 0.2,
      getPolygon: d => d.geometry.coordinates,
      getFillColor: d => [0, 17, 94],
      getLineColor: [0, 17, 94],
      getLineWidth: 1,
      onClick: ({ object, x, y }) => {
        retirerParcelle(object, parcelles, setParcelles);
      }
    })
  ];
}

export { renderLayers };
export { parcellesUrl };
