import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/toastr';

const initialState = {
  notifications: [],
};

export default handleActions(
  {
    [types.POP]: (state, actionData) => {
      const { type, ...payload } = actionData; // eslint-disable-line no-unused-vars
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: new Date().getTime(),
            ...payload,
          },
        ],
      };
    },

    [types.EXPIRE]: (state, { id }) => ({
      ...state,
      notifications: [
        ...state.notifications.filter(notification => notification.id !== id),
      ],
    }),

    [types.FLUSH]: state => ({
      ...state,
      notifications: [],
    }),
  },
  initialState,
);
