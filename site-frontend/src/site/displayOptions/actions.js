import { UPDATE_DISPLAY_OPTION, RESET_DISPLAY_OPTION } from 'site/displayOptions/constants';

export const updateDisplayOption = (key, value) => ({
  type: UPDATE_DISPLAY_OPTION,
  key,
  value,
});

export const resetDisplayOption = key => ({
  type: RESET_DISPLAY_OPTION,
  key,
});
