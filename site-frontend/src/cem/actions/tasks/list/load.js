import { API } from 'core/config/sources';

import { mapListFilter } from 'cem/helpers/tasks';

import { updatePagination } from 'core/actions/pagination';
import { loadContacts } from 'cem/_contacts/old_actions/list';
import loadLeads from 'cem/actions/leads/list/load';

import * as types from 'cem/constants/tasks/actions';

import uniq from 'lodash/uniq';

const loadTasksStarted = (kind, appendResult) => ({
  type: types.LOAD_TASKS,
  kind,
  appendResult,
});

const loadTasksSucceeded = (kind, { items, pagination }, appendResult) => (
  dispatch,
  getState,
) => {
  const contactIds = uniq(
    items
      .map(
        ({
          contactDetails = {},
          previewDetails = {},
          freeDetails = {},
          negotiationDetails = {},
        }) => {
          const contactId =
            contactDetails.contactId ||
            previewDetails.contactId ||
            freeDetails.contactId ||
            negotiationDetails.contactId;

          return contactId && !getState().contacts[contactId]
            ? contactId
            : undefined;
        },
      )
      .filter(id => id),
  );

  const clientLeadIds = uniq(
    items
      .map(({ contactDetails = {}, freeDetails = {} }) => {
        const clientLeadId =
          contactDetails.clientLeadId || freeDetails.clientLeadId;

        return clientLeadId &&
          (!getState().leads[clientLeadId] ||
            !getState().leads[clientLeadId].data)
          ? clientLeadId
          : undefined;
      })
      .filter(id => id),
  );

  if (contactIds.length) {
    dispatch(loadContacts({ filter: { id: contactIds } }));
  }

  if (clientLeadIds.length) {
    dispatch(loadLeads('', { filter: { id: clientLeadIds } }));
  }

  dispatch(updatePagination(`tasks.${kind}`, pagination));

  return dispatch({
    type: types.LOAD_TASKS_SUCCESS,
    kind,
    items,
    appendResult,
  });
};

const loadTasksFailed = (kind, { errors }) => ({
  type: types.LOAD_TASKS_FAIL,
  kind,
  errors,
});

const loadTasks = (
  kind,
  queryParams = {},
  appendResult = false,
) => dispatch => {
  dispatch(loadTasksStarted(kind, queryParams));

  const filter = mapListFilter(queryParams.filter, kind);

  return API.get('/v1/tasks', {
    ...queryParams,
    filter,
    orderBy: { deadline: 'asc' },
  }).then(
    ({ body }) => dispatch(loadTasksSucceeded(kind, body, appendResult)),
    ({ body }) => dispatch(loadTasksFailed(kind, body)),
  );
};

export default loadTasks;
