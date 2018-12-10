import keyBy from 'lodash/keyBy';

export const listLoadStart = (state, group, append = false) => ({
  ...state,
  [group]: {
    ...state[group],
    ids: append ? state[group].ids : [],
    isFetching: true,
  },
});

export const listLoadFail = (state, group, errors) => ({
  ...state,
  [group]: {
    ...state[group],
    isFetching: false,
    errors,
  },
});

export const listLoadSuccess = (state, group, items, append = false, pk = 'id') => {
  const previousIds = append && state[group].ids ? state[group].ids : [];

  return {
    ...state,
    ...keyBy(items.map(item => ({ data: item })), `data.${pk}`),
    [group]: {
      ...state[group],
      isFetching: false,
      ids: [...previousIds, ...items.map(item => item[pk])],
    },
  };
};

export const elementLoadStart = (state, id) => ({
  ...state,
  [id]: {
    ...state[id],
    isFetching: true,
  },
});

export const elementLoadFail = (state, id, errors) => ({
  ...state,
  [id]: {
    ...state[id],
    isFetching: false,
    errors,
  },
});

export const elementLoadSuccess = (state, id, data) => ({
  ...state,
  [id]: {
    ...state[id],
    isFetching: false,
    data,
  },
});

const linkedListLoadStartResetState = (state, resourceId, listName) => ({
  ...state,
  [resourceId]: {
    ...(state[resourceId] || {}),
    [listName]: {
      isFetching: true,
    },
  },
});

const linkedListLoadStartKeepState = (state, resourceId, listName) => {
  const oldResource = state[resourceId] || {};
  const oldList = oldResource[listName] || {};

  return {
    ...state,
    [resourceId]: {
      ...(state[resourceId] || {}),
      [listName]: {
        ...oldList,
        isFetching: true,
      },
    },
  };
};

export const linkedListLoadStart = (state, resourceId, listName, resetState = true) => {
  if (resetState) {
    return linkedListLoadStartResetState(state, resourceId, listName);
  }
  return linkedListLoadStartKeepState(state, resourceId, listName);
};

export const linkedListLoadFail = (state, resourceId, listName, errors) => ({
  ...state,
  [resourceId]: {
    ...(state[resourceId] || {}),
    [listName]: {
      errors,
    },
  },
});

export const linkedListLoadSuccess = (state, resourceId, listName, items, pk = 'id') => ({
  ...state,
  [resourceId]: {
    ...(state[resourceId] || {}),
    [listName]: {
      ids: items.map(item => item[pk]),
      ...keyBy(items, pk),
    },
  },
});

export const elementCreateStart = state => state;

export const elementCreateFail = state => state;

export const elementCreateSuccess = state => state;

export const elementUpdateStart = state => state;

export const elementUpdateFail = state => state;

export const elementUpdateSuccess = state => state;

export const elementDeleteStart = state => state;

export const elementDeleteFail = state => state;

export const elementDeleteSuccess = state => state;

export const elementPhotoUploadStart = (state, resourceId) => ({
  ...state,
  [resourceId]: {
    ...state[resourceId],
    isPhotoUploading: true,
  },
});

export const elementPhotoUploadFail = (state, resourceId, errors) => ({
  ...state,
  [resourceId]: {
    ...state[resourceId],
    isPhotoUploading: false,
    errors,
  },
});

export const elementPhotoUploadSuccess = (state, resourceId) => ({
  ...state,
  [resourceId]: {
    ...state[resourceId],
    isPhotoUploading: false,
  },
});
