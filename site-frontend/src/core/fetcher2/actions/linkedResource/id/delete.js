import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher2/constants/apiPaths';

export const deleteLinkedResourceRecordStarted = (type, resource, resourceId, listName, id) => ({
  type,
  resourceId,
  listName,
  id,
});

export const deleteLinkedResourceRecordFailed = (
  type,
  resource,
  resourceId,
  listName,
  id,
  errors,
) => ({
  type,
  resource,
  resourceId,
  listName,
  id,
  errors,
});

export const deleteLinkedResourceRecordSucceeded = (type, resource, resourceId, listName, id) => ({
  type,
  resource,
  resourceId,
  listName,
  id,
});

export const deleteLinkedResourceRecord = (resource, resourceId, listName, id) => {
  const pathName = `${resource}.${listName}`;
  const path = `${apiPaths[pathName](resourceId)}/${id}`;

  return API.del(path).then(
    () => Promise.resolve(),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
