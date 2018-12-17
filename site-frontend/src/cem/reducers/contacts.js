import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/contacts';
import keyBy from 'lodash/keyBy';

const initialState = {
  list: {},
};

export default handleActions(
  {
    [types.LOAD_LIST]: state => ({
      ...state,
      list: {
        isFetching: true,
      },
    }),

    [types.LOAD_LIST_SUCCESS]: (state, { items }) => ({
      ...state,
      list: {
        items,
      },
      ...keyBy(items, 'id'),
    }),

    [types.LOAD_LIST_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),

    [types.LOAD_ID_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_ID_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),

    [types.LOAD_DOCUMENTS]: state => ({
      ...state,
      documents: {
        isFetching: true,
      },
    }),

    [types.LOAD_DOCUMENTS_SUCCESS]: (state, documents) => ({
      ...state,
      documents: {
        ...documents,
      },
    }),

    [types.LOAD_DOCUMENTS_FAIL]: (state, { errors }) => ({
      ...state,
      documents: {
        errors,
      },
    }),

    [types.LOAD_LINKED_CONTACTS]: state => ({
      ...state,
      linkedContacts: {
        isFetching: true,
      },
    }),

    [types.LOAD_LINKED_CONTACTS_SUCCESS]: (state, { items }) => ({
      ...state,
      linkedContacts: {
        items,
      },
    }),

    [types.LOAD_LINKED_CONTACTS_FAIL]: (state, { errors }) => ({
      ...state,
      linkedContacts: {
        errors,
      },
    }),
  },
  initialState,
);
