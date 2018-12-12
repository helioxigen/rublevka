import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/properties/actions';

const initialState = {};
export default handleActions({
  [types.LOAD_DOCUMENTS_SUCCESS]: (state, { propertyId, items }) => ({
    ...state,
    [propertyId]: items,
  }),
}, initialState);
