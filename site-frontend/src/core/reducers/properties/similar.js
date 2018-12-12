import { handleActions } from 'redux-actions';
import {
  LOAD_SIMILAR_PROPERTIES, LOAD_SIMILAR_PROPERTIES_SUCCEEDED, LOAD_SIMILAR_PROPERTIES_FAILED,
} from '../../constants/properties';

const initialState = {};

const similarProperties = handleActions({
  [LOAD_SIMILAR_PROPERTIES]: (state, action) => {
    const { id } = action;

    return {
      ...state,
      [id]: {
        isFetching: true,
      },
    };
  },

  [LOAD_SIMILAR_PROPERTIES_SUCCEEDED]: (state, action) => {
    const { id, data } = action;

    return {
      ...state,
      [id]: {
        isFetching: false,
        data,
      },
    };
  },

  [LOAD_SIMILAR_PROPERTIES_FAILED]: (state, action) => {
    const { id, error } = action;

    return {
      ...state,
      [id]: {
        isFetching: false,
        error,
      },
    };
  },
}, initialState);

export default similarProperties;
