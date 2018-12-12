import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher2/constants/apiPaths';

export const loadLinkedListStarted = (type, resource, resourceId, listName, resetState = true) => ({
  type,
  resource,
  resourceId,
  listName,
  resetState,
});

export const loadLinkedListFailed = (type, resource, resourceId, listName, errors) => ({
  type,
  resource,
  resourceId,
  listName,
  errors,
});

export const loadLinkedListSucceeded = (type, resource, resourceId, listName, items) => ({
  type,
  resource,
  resourceId,
  listName,
  items,
});

export const loadLinkedList = (resource, resourceId, listName, queryParams = {}) => API.get(apiPaths[`${resource}.${listName}`](resourceId), queryParams)
    .then(
      ({ body: { items, pagination } }) => Promise.resolve({ items, pagination }),
      ({ body: { errors } }) => Promise.reject(errors),
    );
