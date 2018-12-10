import { handleActions } from 'redux-actions';
import {
  LOAD_PROPERTIES, LOAD_PROPERTIES_SUCCEEDED, LOAD_PROPERTIES_FAILED,
  LOAD_PROPERTY, LOAD_PROPERTY_SUCCEEDED, LOAD_PROPERTY_FAILED,
} from '../../constants/properties';

const initialState = {};

const properties = handleActions({
  // properties
  [LOAD_PROPERTIES]: (state, { kind }) => ({
    ...state,
    [kind]: {
      list: {
        isFetching: true,
      },
    },
  }),

  [LOAD_PROPERTIES_SUCCEEDED]: (state, { kind, items }) => ({
    ...state,
    [kind]: {
      list: {
        items,
      },
    },
  }),

  [LOAD_PROPERTIES_FAILED]: (state, { kind, error }) => ({
    ...state,
    [kind]: {
      list: {
        error,
      },
    },
  }),

  // property
  [LOAD_PROPERTY]: (state, action) => ({
    ...state,
    [action.id]: {
      isFetching: true,
    },
  }),

  [LOAD_PROPERTY_SUCCEEDED]: (state, action) => {
    const { id, data, timestamp } = action;

    return {
      ...state,
      [id]: {
        isFetching: false,

        data,
        timestamp,
      },
    };
  },

  [LOAD_PROPERTY_FAILED]: (state, action) => {
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

export default properties;
