import { API } from 'core/config/sources';

import * as types from 'cem/constants/companies/actions';

import { updatePagination } from 'core/actions/pagination';

import { mapFilter } from 'cem/helpers/companies';

const loadCompaniesStarted = () => ({
  type: types.LOAD_COMPANIES,
});

const loadCompaniesFailed = ({ errors }) => ({
  type: types.LOAD_COMPANIES_FAIL,
  errors,
});

const loadCompaniesSucceeded = ({ items, pagination }) => dispatch => {
  dispatch(updatePagination('companies', pagination));

  return dispatch({
    type: types.LOAD_COMPANIES_SUCCESS,
    items,
  });
};

export default (queryParams = { filter: {} }) => dispatch => {
  dispatch(loadCompaniesStarted());

  return API.get('/v1/companies', {
    ...queryParams,
    filter: mapFilter(queryParams.filter),
  }).then(
    ({ body }) => dispatch(loadCompaniesSucceeded(body)),
    ({ body }) => dispatch(loadCompaniesFailed(body)),
  );
};
