import { API } from 'core/config/sources';
import * as types from 'cem/constants/companies/actions';

import { extractIdFromLocation } from 'core/utils/response';

const createCompanyStarted = data => ({
  type: types.CREATE_COMPANY,
  data,
});

const createCompanySucceeded = ({ location }, data) => ({
  type: types.CREATE_COMPANY_SUCCESS,
  id: extractIdFromLocation(location),
  data,
});

const createCompanyFailed = ({ errors }, data) => ({
  type: types.CREATE_COMPANY_FAIL,
  errors,
  data,
});

export default function createCompany(data) {
  return (dispatch) => {
    dispatch(createCompanyStarted(data));

    return API.post('/v1/companies', data)
      .then(({ headers }) => dispatch(createCompanySucceeded(headers, data)))
      .catch(({ body }) => dispatch(createCompanyFailed(body, data)));
  };
}
