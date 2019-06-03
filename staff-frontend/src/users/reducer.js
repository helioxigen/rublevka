import { handleActions } from 'redux-actions';
import {
  LOAD_ID_SUCCESS,
  LOAD_LIST,
  LOAD_LIST_SUCCESS,
  LOAD_LIST_FAIL,
} from './constants';

const initialState = {
  list: {},
  documentsByUserId: {},
  subordinateUsersByUserId: {},
};

export default handleActions(
  {
    [LOAD_ID_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [LOAD_LIST]: state => ({
      ...state,
      list: {
        isFetching: true,
      },
    }),

    [LOAD_LIST_SUCCESS]: (state, { items }) => ({
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

    [LOAD_LIST_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),
  },
  initialState,
);
