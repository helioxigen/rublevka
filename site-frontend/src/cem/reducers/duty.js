import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/duty/actions';

const initialState = {
  list: {},
};

export default handleActions(
  {
    [types.LOAD_DUTIES]: state => ({
      ...state,
      list: {
        isFetching: true,
      },
    }),

    [types.LOAD_DUTIES_SUCCESS]: (state, { items }) => ({
      ...state,
      list: {
        items,
      },
      ...items.reduce(
        (result, item) => ({
          ...result,
          [item.id]: {
            data: item,
          },
        }),
        {},
      ),
    }),

    [types.LOAD_DUTIES_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),

    [types.LOAD_DUTY_SUCCESS]: (state, { data }) => ({
      ...state,
      [data.id]: {
        data,
      },
    }),
  },
  initialState,
);
