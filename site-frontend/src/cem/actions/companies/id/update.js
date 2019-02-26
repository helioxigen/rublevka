import { API } from 'core/config/sources';
import * as types from 'cem/constants/companies/actions';

const updateCompanyStarted = (id, data) => ({
  type: types.UPDATE_COMPANY,
  id,
  data,
});

const updateCompanySucceeded = (id, data) => ({
  type: types.UPDATE_COMPANY_SUCCESS,
  id,
  data,
});

const updateCompanyFailed = (id, { errors }, data) => ({
  type: types.UPDATE_COMPANY_FAIL,
  id,
  errors,
  data,
});

export default function updateCompany(id, data) {
  return dispatch => {
    dispatch(updateCompanyStarted(id, data));

    return API.put(`/v1/companies/${id}`, data)
      .then(() => dispatch(updateCompanySucceeded(id, data)))
      .catch(({ body }) => dispatch(updateCompanyFailed(id, body, data)));
  };
}
