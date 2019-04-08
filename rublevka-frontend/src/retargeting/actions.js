import global from 'window-or-global';

import * as types from 'retargeting/constants/actions';

export const setDefaultRetargetingKey = providerName => ({
  type: types.SET_KEY,
  providerName,
  apiKey: global.config.retargetingKeys[providerName].default,
});

export const setSharedRetargetingKey = providerName => ({
  type: types.SET_KEY,
  providerName,
  apiKey: global.config.retargetingKeys[providerName].shared,
});
