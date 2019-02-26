import { API } from 'core/config/sources';

import loadComplex from './load';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/complexes/actions';

import { transformDataOut } from 'cem/helpers/complexes';

const updateComplexStarted = (id, data) => ({
  type: types.UPDATE_COMPLEX,
  id,
  data,
});

const updateComplexFailed = (id, errors) => ({
  type: types.UPDATE_COMPLEX_FAIL,
  errors,
});

const updateComplex = (id, data) => dispatch => {
  dispatch(updateComplexStarted(id, data));

  return API.put(`/v1/complexes/${id}`, transformDataOut(data)).then(
    () => {
      dispatch(
        pop('success', `Жилой комплекс (ID: ${id})`, 'Успешно обновлён'),
      );
      dispatch(loadComplex(id));
    },
    ({ body }) => {
      dispatch(updateComplexFailed(id, body));
      return body;
    },
  );
};

export default updateComplex;
