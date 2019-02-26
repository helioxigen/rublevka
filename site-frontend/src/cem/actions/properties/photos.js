import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

import { pop } from 'cem/actions/toastr';

const uploadPhotoStarted = (category, id, src) => ({
  type: types.UPLOAD_PHOTO,
  category,
  id,
  src,
});

const uploadPhotoFailed = (category, id, status) => dispatch => {
  if (status === 304) {
    dispatch(pop('info', 'Такая фотография уже существует'));
  }

  dispatch({
    type: types.UPLOAD_PHOTO_FAIL,
    category,
    id,
  });
};

const uploadPhotoSucceeded = (category, propertyId, photoId) => ({
  type: types.UPLOAD_PHOTO_SUCCESS,
  category,
  propertyId,
  photoId,
});

export function uploadPhoto(propertyId, src, category = 'city') {
  return dispatch => {
    dispatch(uploadPhotoStarted(category, propertyId, src));

    return API.post(`/v1/properties/${category}/${propertyId}/images`, {
      src,
    }).then(
      ({ body }) =>
        dispatch(uploadPhotoSucceeded(category, propertyId, body.id)),
      ({ status, body }) => {
        dispatch(uploadPhotoFailed(category, propertyId, status));
        return body;
      },
    );
  };
}

const uploadLayoutStarted = (category, id, src) => ({
  type: types.UPLOAD_LAYOUT,
  category,
  id,
  src,
});

const uploadLayoutFailed = (category, id, status) => dispatch => {
  if (status === 304) {
    dispatch(pop('info', 'Такая планировка уже существует'));
  }

  return dispatch({
    type: types.UPLOAD_LAYOUT_FAIL,
    category,
    id,
  });
};

const uploadLayoutSucceeded = (category, propertyId, layoutId) => ({
  type: types.UPLOAD_LAYOUT_SUCCESS,
  category,
  propertyId,
  layoutId,
});

export function uploadLayout(propertyId, src, category = 'city') {
  return dispatch => {
    dispatch(uploadLayoutStarted(category, propertyId, src));

    return API.post(`/v1/properties/${category}/${propertyId}/layouts`, {
      src,
    }).then(
      ({ body }) =>
        dispatch(uploadLayoutSucceeded(category, propertyId, body.id)),
      ({ status, body }) => {
        dispatch(uploadLayoutFailed(category, propertyId, status));
        return body;
      },
    );
  };
}
