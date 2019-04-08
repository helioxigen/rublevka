import { API } from 'core/config/sources';

import * as types from 'core/constants/complexes';

const loadComplexStarted = id => ({
  type: types.LOAD_COMPLEX,
  id,
});

const loadComplexSucceeded = (id, data) => ({
  type: types.LOAD_COMPLEX_SUCCESS,
  id,
  data,
});

const loadComplexFailed = (id, errors) => ({
  type: types.LOAD_COMPLEX_FAIL,
  id,
  errors,
});

const loadComplex = id => dispatch => {
  dispatch(loadComplexStarted(id));

  return API.get(`/v1/complex_buildings/${id}`).then(
    ({ body }) => dispatch(loadComplexSucceeded(id, body)),
    ({ body }) => dispatch(loadComplexFailed(id, body)),
  );
};

export default loadComplex;
