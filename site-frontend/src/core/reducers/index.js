import places from './places/places';
import placesSimilar from './places/similar';

import properties from './properties/properties'; // alpha
import _properties from './_properties'; // beta3

import settlementSearch from './settlements/search';
import complexesSearch from './residentialComplexes/search';
import subLocalitiesSearch from './subLocalities/search';

import fetcher from './fetcher';

import complexes from './complexes';
import complexBuildings from './complexBuildings';
import propertiesByComplexId from './propertiesByComplexId';

import _settlements from './_settlements';

import _users from './_users';

export default {
  places,
  placesSimilar,

  properties,
  _properties,

  settlementSearch,
  complexesSearch,
  subLocalitiesSearch,

  complexes,
  complexBuildings,
  propertiesByComplexId,

  fetcher,

  _settlements,

  _users,
};
