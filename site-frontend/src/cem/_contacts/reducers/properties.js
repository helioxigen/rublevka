import * as types from 'cem/_contacts/constants/actions';
import { handleActions } from 'redux-actions';

const initialState = {};

const reducer = handleActions({
  [types.LOAD_PROPERTIES_START]: (state, { propertyCategory }) => ({
    ...state,
    [propertyCategory]: {
      isFetching: true,
    },
  }),

  [types.LOAD_PROPERTIES_DONE]: (state, { propertyCategory, items, pagination }) => ({
    ...state,
    [propertyCategory]: {
      isFetching: false,
      items,
      pagination,
    },
  }),
}, initialState);

export default reducer;
