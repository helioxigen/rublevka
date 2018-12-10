import { loadList, loadListStarted, loadListFailed, loadListSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/constants/_tasks/actions';
import { defaultQueryParamsByGroup, resourceName } from 'cem/constants/_tasks/defaults';

import { updatePagination } from 'core/actions/pagination';
import UsersActions from 'cem/actions/users';

const loadLinkedUsers = userIds => (dispatch) => {
  if (userIds.length) {
    dispatch(UsersActions.loadList({ filter: { id: userIds } }));
  }
};

const loadTasks = (queryParams, group) => (dispatch, getState) => {
  dispatch(loadListStarted(types.LOAD_TASKS, group));

  return loadList(resourceName, group, { defaultQueryParamsByGroup }, { ...queryParams })
    .then(
      ({ items, pagination }) => {
        dispatch(loadLinkedUsers(items.filter(item => !getState().users[item.responsibleUser.id]).map(item => item.responsibleUser.id)));
        dispatch(updatePagination(`${resourceName}.${group}`, pagination));
        dispatch(loadListSucceeded(types.LOAD_TASKS_SUCCEEDED, group, items));

        return items;
      }, (errors) => {
        dispatch(loadListFailed(types.LOAD_TASKS_FAILED, group, errors));

        return errors;
      },
    );
};

export default loadTasks;
