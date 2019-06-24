import lineIntersect from '@turf/line-intersect';
import centroid from '@turf/centroid';
import area from '@turf/area';

function parcelleIsContigue(parcelle, parcelles) {
  if (parcelles.length < 1) return true;
  let intersections = parcelles.filter(
    p => lineIntersect(parcelle, p).features.length > 0
  );
  return intersections.length > 0;
}

function parcelleIsIncluded(parcelle, parcelles) {
  return parcelles.filter(p => p.id === parcelle.id).length > 0;
}

function parcelleCenter(parcelle) {
  return centroid(parcelle);
}

function parcellesSurfaceTotale(parcelles, precision = 2) {
  var surface = 0;
  parcelles.map(parcelle => (surface += area(parcelle)));
  return Number.parseFloat(surface).toFixed(precision);
}

export { parcelleIsContigue };

export { parcelleIsIncluded };

export { parcelleCenter };

export { parcellesSurfaceTotale };
