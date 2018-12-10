import { API } from 'core/config/sources';
import { extractIdFromLocation } from 'core/utils/response';

import apiPaths from 'core/fetcher2/constants/apiPaths';

export const createLinkedResourceRecordStarted = (type, resource, resourceId, listName, data) => ({
  type,
  resource,
  resourceId,
  listName,
  data,
});

export const createLinkedResourceRecordFailed = (type, resource, resourceId, listName, errors) => ({
  type,
  resource,
  resourceId,
  listName,
  errors,
});

export const createLinkedResourceRecordSucceeded = (type, resource, resourceId, listName) => ({
  type,
  resource,
  resourceId,
  listName,
});

export const createLinkedResourceRecord = (resource, resourceId, listName, data) => {
  const pathName = `${resource}.${listName}`;

  return API.post(apiPaths[pathName](resourceId), data)
    .then(
      ({ headers }) => Promise.resolve({ id: extractIdFromLocation(headers.location) }),
      ({ body: { errors } }) => Promise.reject(errors),
    );
};
