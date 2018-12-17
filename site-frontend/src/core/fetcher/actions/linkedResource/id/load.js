import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';

export const loadLinkedResourceRecordStarted = (type, resourceId, listName, id) => ({
  type,
  resourceId,
  listName,
  id,
});

export const loadLinkedResourceRecordFailed = (type, resourceId, listName, id, errors) => ({
  type,
  resourceId,
  listName,
  id,
  errors,
});

export const loadLinkedResourceRecordSucceeded = (type, resourceId, listName, id, data) => ({
  type,
  resourceId,
  listName,
  id,
  data,
});

export const loadLinkedResourceRecord = (resource, resourceId, listName, id) => {
  const pathName = `${resource}.${listName}`;
  const path = `${apiPaths[pathName](resourceId)}/${id}`;

  return API.get(path).then(
    ({ body: data }) => Promise.resolve({ data }),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
