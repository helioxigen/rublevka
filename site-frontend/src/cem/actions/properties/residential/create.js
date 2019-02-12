import { API } from 'core/config/sources';
import { transformResidential } from '../helpers';

import loadResidential from './load';

import * as types from 'cem/constants/properties/actions';

const createResidentialStarted = complex => ({
  type: types.CREATE_RESIDENTIAL,
  complex,
});

const createResidentialFailed = errors => ({
  type: types.CREATE_RESIDENTIAL_FAIL,
  errors,
});

const createResidentialSucceded = id => ({
  type: types.CREATE_RESIDENTIAL_SUCCESS,
  id,
});

export default function(data, location) {
  return dispatch => {
    dispatch(createResidentialStarted());

    const complex = {
      ...data,
      state: 'draft',
      images: [],
      location,
    };
    return API.post('/v1/complexes', transformResidential(complex)).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body }) => {
          dispatch(loadResidential(body.id));
          return dispatch(createResidentialSucceded(body.id));
        }),
      ({ body }) => {
        dispatch(createResidentialFailed(body));
        return body;
      },
    );
  };
}
