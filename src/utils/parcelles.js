import intersect from '@turf/intersect';
import centroid from '@turf/centroid';
import area from '@turf/area';

const parcelleIsContigue = (parcelle, parcelles) => {
  if (parcelles.length < 1) return true;
  let intersections = parcelles.filter(p => intersect(parcelle, p) !== null);
  return intersections.length > 0;
};

const parcelleIsIncluded = (parcelle, parcelles) => {
  return parcelles.filter(p => p.id === parcelle.id).length > 0;
};

const parcelleCenter = parcelle => {
  return centroid(parcelle);
};

const parcellesSurfaceTotale = (parcelles, precision = 2) => {
  var surface = 0;
  parcelles.map(parcelle => (surface += area(parcelle)));
  return Number.parseFloat(surface).toFixed(precision);
};

export { parcelleIsContigue };

export { parcelleIsIncluded };

export { parcelleCenter };

export { parcellesSurfaceTotale };
