import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/properties/actions';

const initialState = {
  'city.default': {
    list: {},
  },
  'country.default': {
    list: {},
  },
  'city.initial': {
    list: {},
  },
  'country.initial': {
    list: {},
  },
  'city.resale': {
    list: {},
  },
  'country.resale': {
    list: {},
  },
  'city.removed': {
    list: {},
  },
  'country.removed': {
    list: {},
  },
  'city.all': {
    list: {},
  },
  'country.all': {
    list: {},
  },
};

export default handleActions({
  [types.LOAD_PROPERTIES]: (state, { category, group }) => ({
    ...state,
    [`${category}.${group}`]: {
      ...state[`${category}.${group}`],
      list: {
        ...state[`${category}.${group}`].list,
        isFetching: true,
      },
    },
  }),

  [types.LOAD_PROPERTIES_SUCCESS]: (state, { category, group, items }) => ({
    ...state,
    [`${category}.${group}`]: {
      ...state[`${category}.${group}`],
      list: {
        ...state[`${category}.${group}`].list,
        isFetching: false,
        items,
      },
    },
    ...items.reduce((result, data) => ({
      ...result,
      [data.id]: {
        data,
      },
    }), {}),
  }),

  [types.LOAD_PROPERTIES_FAIL]: (state, { category, group, errors }) => ({
    ...state,
    [`${category}.${group}`]: {
      ...state[`${category}.${group}`],
      list: {
        ...state[`${category}.${group}`].list,
        isFetching: false,
        errors,
      },
    },
  }),

  [types.LOAD_PROPERTY_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.UPLOAD_PHOTO]: (state, { id }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isImageUploading: true,
      },
    },
  }),

  [types.UPLOAD_PHOTO_FAIL]: (state, { id }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isImageUploading: false,
      },
    },
  }),

  [types.UPLOAD_LAYOUT]: (state, { id }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isLayoutUploading: true,
      },
    },
  }),

  // TODO NOTE Success
  [types.UPLOAD_PHOTO_FINISH]: (state, { id }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isImageUploading: false,
      },
    },
  }),

  // TODO NOTE Success
  [types.UPLOAD_LAYOUT_FINISH]: (state, { id }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isLayoutUploading: false,
      },
    },
  }),

  [types.CHANGE_RESIDENTIAL]: (state, { id, location }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isResidentialChanging: true,
        residentialComplexId: null,
        location,
      },
    },
  }),

  [types.CHANGE_RESIDENTIAL_SUCCESS]: (state, { id, residentialComplexId, location }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        isResidentialChanging: false,
        residentialComplexId,
        location,
      },
    },
  }),

  [types.CHANGE_LOCATION]: (state, { id, location }) => ({
    ...state,
    [id]: {
      data: {
        ...state[id].data,
        location,
      },
    },
  }),
}, initialState);
