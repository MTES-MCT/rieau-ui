import intersect from '@turf/intersect';
import centroid from '@turf/centroid';

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

export { parcelleIsContigue };

export { parcelleIsIncluded };

export { parcelleCenter };
