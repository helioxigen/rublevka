import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/companies/actions';

import keyBy from 'lodash/keyBy';

const initialState = {
  list: {},
};

export default handleActions({
  [types.LOAD_COMPANIES]: state => ({
    ...state,
    list: {
      isFetching: true,
    },
  }),

  [types.LOAD_COMPANIES_FAIL]: (state, { errors }) => ({
    ...state,
    list: {
      errors,
    },
  }),

  [types.LOAD_COMPANIES_SUCCESS]: (state, { items }) => ({
    ...state,
    list: {
      items,
    },
    ...keyBy(items, 'id'),
  }),

  [types.LOAD_COMPANY]: (state, { id }) => ({
    ...state,
    [id]: { isFetching: true },
  }),

  [types.LOAD_COMPANY_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: { data },
  }),

  [types.LOAD_COMPANY_FAIL]: (state, { id, errors }) => ({
    ...state,
    [id]: { errors },
  }),
}, initialState);
