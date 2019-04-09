import { handleActions } from 'redux-actions';
import {
  UPDATE_DISPLAY_OPTION,
  RESET_DISPLAY_OPTION,
} from 'displayOptions/constants';

const initialState = {
  currency: 'usd',
};

export default handleActions(
  {
    [UPDATE_DISPLAY_OPTION]: (state, { key, value }) => ({
      ...state,
      [key]: value,
    }),

    [RESET_DISPLAY_OPTION]: (state, { key }) => ({
      ...state,
      [key]: undefined,
    }),
  },
  initialState,
);
