import { API } from 'core/config/sources';
import { transformResidentialIn } from '../helpers';

import * as types from 'cem/constants/complexes/actions';

const loadResidentialStarted = id => ({
  type: types.LOAD_RESIDENTIAL_COMPLEX,
  id,
});

const loadResidentialSucceeded = (id, data) => ({
  type: types.LOAD_RESIDENTIAL_COMPLEX_SUCCESS,
  id,
  data,
});

const loadResidentialFailed = (id, errors) => ({
  type: types.LOAD_RESIDENTIAL_COMPLEX_FAIL,
  errors,
  id,
});

export default function(id) {
  return dispatch => {
    dispatch(loadResidentialStarted(id));

    return API.get(`/v1/complexes/${id}`).then(
      ({ body }) =>
        dispatch(loadResidentialSucceeded(id, transformResidentialIn(body))),
      ({ body }) => dispatch(loadResidentialFailed(id, body)),
    );
  };
}
