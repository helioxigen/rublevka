import { API } from 'core/config/sources';
import * as types from 'cem/constants/companies/actions';

const loadCompanyStarted = data => ({
  type: types.LOAD_COMPANY,
  data,
});

const loadCompanySucceeded = (id, data) => ({
  type: types.LOAD_COMPANY_SUCCESS,
  id,
  data,
});

const loadCompanyFailed = (id, { errors }) => ({
  type: types.LOAD_COMPANY_FAIL,
  id,
  errors,
});

export default function loadCompany(id) {
  return dispatch => {
    dispatch(loadCompanyStarted(id));

    return API.get(`/v1/companies/${id}`)
      .then(({ body }) => dispatch(loadCompanySucceeded(id, body)))
      .catch(({ body }) => dispatch(loadCompanyFailed(id, body)));
  };
}
