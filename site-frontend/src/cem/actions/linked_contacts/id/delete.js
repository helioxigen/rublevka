import {
  deleteLinkedResourceRecord,
  deleteLinkedResourceRecordStarted,
  deleteLinkedResourceRecordFailed,
  deleteLinkedResourceRecordSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/linked_contacts/actions';
import { listName } from 'cem/constants/linked_contacts/fetcher';

export default function deleteLinkedContact(resource, resourceId, id) {
  return dispatch => {
    dispatch(
      deleteLinkedResourceRecordStarted(
        types.DELETE_LINK_RECORD,
        resource,
        resourceId,
        listName,
        id,
      ),
    );

    return deleteLinkedResourceRecord(resource, resourceId, listName, id).then(
      () =>
        dispatch(
          deleteLinkedResourceRecordSucceeded(
            types.DELETE_LINK_RECORD_SUCCESS,
            resource,
            resourceId,
            listName,
            id,
          ),
        ),
      ({ errors }) =>
        dispatch(
          deleteLinkedResourceRecordFailed(
            types.DELETE_LINK_RECORD_FAIL,
            resource,
            resourceId,
            listName,
            id,
            errors,
          ),
        ),
    );
  };
}
