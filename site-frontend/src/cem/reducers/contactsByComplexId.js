import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/complexes/actions';

import keyBy from 'lodash/keyBy';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_LINKED_CONTACTS_SUCCESS]: (state, { complexId, items }) => ({
      ...state,
      [complexId]: {
        items: keyBy(items, 'id'),
      },
    }),

    [types.LOAD_LINKED_CONTACTS_FAIL]: (state, { complexId, errors }) => ({
      ...state,
      [complexId]: {
        errors,
      },
    }),

    [types.LOAD_CONTACT_SUCCESS]: (state, { complexId, data }) => ({
      ...state,
      [complexId]: {
        items: {
          ...(state[complexId].items || {}),
          [data.id]: data,
        },
      },
    }),

    [types.RESET_LINKED_CONTACTS]: (state, { complexId }) => ({
      ...state,
      [complexId]: {
        items: [],
      },
    }),
  },
  initialState,
);
