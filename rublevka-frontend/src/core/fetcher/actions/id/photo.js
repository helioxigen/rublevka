import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';
import { throwFormattedError } from 'core/fetcher/helpers';

export const uploadElementPhotoStarted = (type, resourceId) => ({
  type,
  id: resourceId,
});

export const uploadElementPhotoSucceeded = (type, resourceId, photoId) => ({
  type,
  id: resourceId,
  photoId,
});

export const uploadElementPhotoFailed = (type, resourceId, errors) => ({
  type,
  id: resourceId,
  errors,
});

export const uploadElementPhoto = (resourceName, resourceId, src) => {
  if (!resourceName) throwFormattedError('required', resourceName);
  if (!resourceId) throwFormattedError('required', resourceId);
  if (!apiPaths[resourceName]) {
    throwFormattedError('apiPathEmpty', resourceName);
  }

  return API.post(`${apiPaths[resourceName]}/${resourceId}/photo`, {
    src,
  }).then(
    ({ body: { id } }) => Promise.resolve({ photoId: id }),
    ({ status, body: { errors } }) => Promise.reject(errors, status),
  );
};
