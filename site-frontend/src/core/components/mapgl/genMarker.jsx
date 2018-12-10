export default function ({ lng, lat, icon = 'marker', id, name }) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat],
    },
    properties: {
      id,
      name,
      'marker-symbol': icon,
    },
  };
}
