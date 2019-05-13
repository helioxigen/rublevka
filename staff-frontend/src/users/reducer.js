import { handleActions } from 'redux-actions';
import * as types from './constants';

const initialState = {
  list: {},
  documentsByUserId: {},
  subordinateUsersByUserId: {},
};

export default handleActions(
  {
    [types.LOAD_ID_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),
  },
  initialState,
);
