import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/dictionaries';

const initialState = {
  list: {},
};

export default handleActions(
  {
    // [types.LOAD_KINDS]: (state) => ({
    //   ...state,
    //   list: {
    //     isFetching: true,
    //   },
    // }),
    //
    // [types.LOAD_KINDS_SUCCESS]: (state, { items }) => ({
    //   ...state,
    //   list: {
    //     items,
    //   },
    // }),
    //
    // [types.LOAD_KINDS_FAIL]: (state, { errors }) => ({
    //   ...state,
    //   list: {
    //     errors,
    //   },
    // }),

    [types.LOAD_WORDS_BY_KIND]: (state, { kind }) => ({
      ...state,
      [kind]: {
        isFetching: true,
      },
    }),

    [types.LOAD_WORDS_BY_KIND_SUCCESS]: (state, { kind, items, pagination }) => ({
      ...state,
      [kind]: {
        items,
        pagination,
      },
    }),

    [types.LOAD_WORDS_BY_KIND_FAIL]: (state, { kind, errors }) => ({
      ...state,
      [kind]: {
        errors,
      },
    }),

    [types.UPDATE_PAGINATION]: (state, { kind, pagination }) => ({
      ...state,
      [kind]: {
        ...state[kind],
        pagination,
      },
    }),
  },
  initialState,
);
