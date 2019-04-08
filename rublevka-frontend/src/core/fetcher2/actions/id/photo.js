import { API } from 'core/config/sources';

import { throwFormattedError } from 'core/fetcher2/helpers';

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

export const uploadElementPhoto = (resource, resourceId, src) => {
  if (!resource) throwFormattedError('required', resource);
  if (!resourceId) throwFormattedError('required', resourceId);

  return API.post(`${resource}/${resourceId}/photo`, { src }).then(
    ({ body: { id } }) => Promise.resolve({ photoId: id }),
    ({ status, body: { errors } }) => Promise.reject(errors, status),
  );
};
