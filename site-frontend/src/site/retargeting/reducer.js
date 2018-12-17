import { handleActions } from 'redux-actions';

import * as types from 'site/retargeting/constants/actions';

const initialState = {
  vk: '',
};

export default handleActions(
  {
    [types.SET_KEY]: (state, { providerName, apiKey }) => ({
      ...state,
      [providerName]: apiKey,
    }),
  },
  initialState,
);
