import { API } from 'core/config/sources';

import loadResidential from './load';

import * as types from 'cem/constants/properties/actions';

const searchResidentialStarted = location => ({
  type: types.SEARCH_RESIDENTIAL,
  location,
});

const searchResidentialSucceeded = id => ({
  type: types.SEARCH_RESIDENTIAL_SUCCESS,
  id,
});

const searchResidentialFailed = () => ({
  type: types.SEARCH_RESIDENTIAL_FAIL,
});

export default function(location) {
  return dispatch => {
    dispatch(searchResidentialStarted(location));

    const filter = {
      'filter[location.countryId]': location.countryId,
      'filter[location.regionId]': location.regionId,
      'filter[location.localityId]': location.localityId,
      'filter[location.street]': location.street,
      'filter[location.house]': location.house,
    };

    return API.get('/v1/complexes', filter).then(({ body }) => {
      if (body.items.length) {
        dispatch(loadResidential(body.items[0].id));
        return dispatch(searchResidentialSucceeded(body.items[0].id));
      }
      return dispatch(searchResidentialFailed());
    });
  };
}
