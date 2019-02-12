import { fetchResource } from 'cem/helpers/autocomplete';

export const kinds = {
  countries: {
    title: ['Страна', 'Страну', 'Страны'],
    parents: [],
    permissionName: 'country',
  },
  regions: {
    title: ['Регион', 'Регион', 'Регион'],
    parents: ['countryId'],
    permissionName: 'region',
  },
  localities: {
    title: ['Населенный пункт', 'Населенный пункт', 'Населенные пункты'],
    parents: ['districtId', 'regionId', 'routeId'],
    permissionName: 'locality',
  },
  routes: {
    title: ['Шоссе', 'Шоссе', 'Шоссе'],
    parents: ['regionId'],
    permissionName: 'route',
  },
  sub_localities: {
    title: ['Район', 'Район', 'Районы'],
    parents: ['localityId'],
    permissionName: 'sub_locality',
  },
  districts: {
    title: ['Округ', 'Округ', 'Округа'],
    parents: ['regionId'],
    permissionName: 'district',
  },
  subways: {
    title: ['Метро', 'Метро', 'Метро'],
    parents: ['subLocalityId'],
    permissionName: 'subway',
  },
};

export const parentFields = {
  countryId: {
    label: 'Страна',
    fetch: fetchResource('/v1/places/countries', 'name'),
  },
  regionId: {
    label: 'Регион',
    fetch: fetchResource('/v1/places/regions', 'name'),
  },
  routeId: {
    label: 'Шоссе',
    fetch: fetchResource('/v1/places/routes', 'name'),
  },
  localityId: {
    label: 'Населенный пункт',
    fetch: fetchResource('/v1/places/localities', 'name'),
  },
  districtId: {
    label: 'Округ',
    fetch: fetchResource('/v1/places/districts', 'name'),
  },
  subLocalityId: {
    label: 'Район',
    fetch: fetchResource('/v1/places/sub_localities', 'name'),
  },
};
