import { handleActions } from 'redux-actions';
import {
  SEARCH_SETTLEMENTS,
  SEARCH_SETTLEENTS_SUCCESS,
  SEARCH_SETTLEMENTS_FAIL,
} from '../../constants/settlements';

const initialState = {};

const settlementSearch = handleActions(
  {
    [SEARCH_SETTLEMENTS]: state => ({
      ...state,
      isFetching: true,
    }),

    [SEARCH_SETTLEENTS_SUCCESS]: (state, { items, pagination, more }) => {
      if (more) {
        return {
          ...state,
          pagination,
          isFetching: false,
          // Append all items to state if we fetch more;
          items: [...state.items, ...items],
        };
      }
      return {
        ...state,
        items,
        pagination,
        isFetching: false,
      };
    },

    [SEARCH_SETTLEMENTS_FAIL]: (state, { errors }) => ({
      ...state,
      errors,
    }),
  },
  initialState,
);

export default settlementSearch;
