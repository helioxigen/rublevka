import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexes/actions';

import { transformDataIn } from 'cem/helpers/complexes';

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

  API.get(`/v1/complexes/${id}`).then(
    ({ body }) => dispatch(loadComplexSucceeded(id, transformDataIn(body))),
    ({ body }) => dispatch(loadComplexFailed(id, body)),
  );
};

export default loadComplex;
