import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher2/constants/apiPaths';

export const updateLinkedResourceRecordStarted = (type, resource, resourceId, listName, id, data) => ({
  type,
  resource,
  resourceId,
  listName,
  id,
  data,
});

export const updateLinkedResourceRecordFailed = (type, resource, resourceId, listName, id, errors) => ({
  type,
  resource,
  resourceId,
  listName,
  id,
  errors,
});

export const updateLinkedResourceRecordSucceeded = (type, resource, resourceId, listName, id, data) => ({
  type,
  resource,
  resourceId,
  listName,
  id,
  data,
});

export const updateLinkedResourceRecord = (resource, resourceId, listName, id, data) => {
  const rootPath = apiPaths[`${resource}.${listName}`](resourceId);
  const path = `${rootPath}/${id}`;

  return API.put(path, data)
    .then(
      () => Promise.resolve(),
      ({ body: { errors } }) => Promise.reject(errors),
    );
};
