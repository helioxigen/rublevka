import { API } from 'core/config/sources';
import { transformIn } from '../helpers';

import * as types from 'cem/constants/properties/actions';

const loadPropertyStarted = id => ({
  type: types.LOAD_PROPERTY,
  id,
});

const loadPropertySucceeded = (category, id, data) => ({
  type: types.LOAD_PROPERTY_SUCCESS,
  data: transformIn(data),
  category,
  id,
});

const loadPropertyFailed = (id, errors) => ({
  type: types.LOAD_PROPERTY_FAIL,
  id,
  errors,
});

export default function(propertyId) {
  return dispatch => {
    dispatch(loadPropertyStarted());

    return API.get(`/v1/properties/${propertyId}`).then(
      ({ body: { category } }) =>
        API.get(`/v1/properties/${category}/${propertyId}`).then(({ body }) =>
          dispatch(loadPropertySucceeded(category, propertyId, body)),
        ),
      ({ body }) => dispatch(loadPropertyFailed(propertyId, body)),
    );
  };
}
