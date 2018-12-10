import { loadLinkedList, loadLinkedListStarted, loadLinkedListFailed, loadLinkedListSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/constants/linked_contacts/actions';
import { listName } from 'cem/constants/linked_contacts/fetcher';

export default function loadLinkedContacts(resource, resourceId, resetState = true) {
  return (dispatch) => {
    dispatch(loadLinkedListStarted(types.LOAD_LINKED_LIST, resource, resourceId, listName, resetState));

    return loadLinkedList(resource, resourceId, listName).then(
      ({ items }) =>
        dispatch(loadLinkedListSucceeded(types.LOAD_LINKED_LIST_SUCCESS, resource, resourceId, listName, items)),
      ({ errors }) =>
        dispatch(loadLinkedListFailed(types.LOAD_LINKED_LIST_FAIL, resource, resourceId, listName, errors)),
    );
  };
}
