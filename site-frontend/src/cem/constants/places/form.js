import validate from 'cem/validators/places';

import { metaKeys } from 'cem/components/seo/meta';

export default {
  form: 'places',
  fields: [
    'name',
    'aliases',
    'kind',
    'location.countryId',
    'location.regionId',
    'location.districtId',
    'location.localityId',
    'location.routeId',
    'location.subLocalityId',
    ...metaKeys(),
  ],
  validate,
};
