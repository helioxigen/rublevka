import { handleActions } from 'redux-actions';

import { LOAD_LINKED_CONTACTS_SUCCESS } from '../countryProperties/constants/actions';

const initialState = {};
export default handleActions(
  {
    [LOAD_LINKED_CONTACTS_SUCCESS]: (state, { propertyId, items }) => ({
      ...state,
      [propertyId]: items,
    }),
  },
  initialState,
);
