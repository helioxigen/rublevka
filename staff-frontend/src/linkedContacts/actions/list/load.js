import {
  LOAD_LINKED_LIST,
  LOAD_LINKED_LIST_SUCCESS,
  LOAD_LINKED_LIST_FAIL,
} from '../types';
import { listName } from '../../constants';
import {
  loadLinkedList,
  loadLinkedListStarted,
  loadLinkedListFailed,
  loadLinkedListSucceeded,
} from '../../../jq-redux-api/actions';

export default function loadLinkedContacts(
  resource,
  resourceId,
  resetState = true,
) {
  return (dispatch) => {
    dispatch(
      loadLinkedListStarted(
        LOAD_LINKED_LIST,
        resource,
        resourceId,
        listName,
        resetState,
      ),
    );

    return loadLinkedList(resource, resourceId, listName).then(
      ({ items }) =>
        dispatch(
          loadLinkedListSucceeded(
            LOAD_LINKED_LIST_SUCCESS,
            resource,
            resourceId,
            listName,
            items,
          ),
        ),
      ({ errors }) =>
        dispatch(
          loadLinkedListFailed(
            LOAD_LINKED_LIST_FAIL,
            resource,
            resourceId,
            listName,
            errors,
          ),
        ),
    );
  };
}
