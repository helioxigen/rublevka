import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/companies/actions';

import keyBy from 'lodash/keyBy';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_LINKED_CONTACTS_SUCCESS]: (state, { companyId, items }) => ({
      ...state,
      [companyId]: {
        items: keyBy(items, 'id'),
      },
    }),

    [types.LOAD_LINKED_CONTACTS_FAIL]: (state, { companyId, errors }) => ({
      ...state,
      [companyId]: {
        errors,
      },
    }),

    [types.LOAD_CONTACT_SUCCESS]: (state, { companyId, data }) => ({
      ...state,
      [companyId]: {
        items: {
          ...(state[companyId].items || {}),
          [data.id]: data,
        },
      },
    }),
  },
  initialState,
);
