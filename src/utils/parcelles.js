import intersect from '@turf/intersect';
import { polygon } from '@turf/helpers';

const parcelleIsContigue = (parcelle, parcelles) => {
  if (parcelles.length < 1) return true;
  let intersections = parcelles.filter(
    p =>
      intersect(
        polygon(parcelle.geometry.coordinates),
        polygon(p.geometry.coordinates)
      ) !== null
  );
  return intersections.length > 0;
};

const parcelleIsIncluded = (parcelle, parcelles) => {
  return parcelles.filter(p => p.id === parcelle.id).length > 0;
};

export { parcelleIsContigue };

export { parcelleIsIncluded };
