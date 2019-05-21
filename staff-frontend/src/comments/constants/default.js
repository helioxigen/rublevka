export const apiPaths = id => ({
  tasks: `/v1/tasks/${id}/comments`,
  imagesRequests: `/v1/orders/images/${id}/comments`,
  removalRequests: `/v1/properties/orders/removal/${id}/comments`,
  searchRequests: `/v1/properties/orders/search/${id}/comments`,
  cityProperties: `/v1/properties/city/${id}/comments`,
  countryProperties: `/v1/properties/country/${id}/comments`,
  complexBuildings: `/v1/complex_buildings/${id}/comments`,
  complexes: `/v1/complexes/${id}/comments`,
  settlements: `/v1/places/settlements/${id}/comments`,
});

export const subscriptionPaths = id => ({
  cityProperties: `by_object/city_property/${id}`,
  countryProperties: `by_object/country_property/${id}`,
  complexBuildings: `by_object/complex_building/${id}`,
  complexes: `by_object/complex/${id}`,
  settlements: `by_object/settlement/${id}`,
});

export const popUpTitles = {
  cityProperties: 'Городской объект',
  countryProperties: 'Загородный объект',
  complexBuildings: 'Корпус',
  complexes: 'Жилой комплекс',
  settlements: 'Посёлок',
};
