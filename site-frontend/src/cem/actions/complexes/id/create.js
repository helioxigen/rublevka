import { API } from 'core/config/sources';

import { pushPath } from 'redux-simple-router';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/complexes/actions';

import { transformDataIn, transformDataOut } from 'cem/helpers/complexes';

const createComplexStarted = () => ({
  type: types.CREATE_COMPLEX,
});

const createComplexSucceeded = (id, data) => (dispatch) => {
  dispatch({
    type: types.CREATE_COMPLEX_SUCCESS,
    id,
    data,
  });

  dispatch(pop('success', `Жилой комплекс (ID: ${id})`, 'Успешно создан'));
  return dispatch(pushPath(`/places/complexes/${id}`));
};

const createComplexFailed = errors => ({
  type: types.CREATE_COMPLEX_FAIL,
  errors,
});

const createComplex = complex => (dispatch) => {
  dispatch(createComplexStarted());

  return API.post('/v1/complexes', transformDataOut(complex)).then(
    ({ headers }) =>
      API.get(headers.location).then(({ body }) =>
        dispatch(createComplexSucceeded(body.id, transformDataIn(body))),
      ),
    ({ body }) => {
      dispatch(createComplexFailed(body));
      return body;
    },
  );
};

export default createComplex;
