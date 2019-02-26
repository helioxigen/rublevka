import {
  createLinkedResourceRecord,
  createLinkedResourceRecordStarted,
  createLinkedResourceRecordFailed,
  createLinkedResourceRecordSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/linked_contacts/actions';
import { listName } from 'cem/constants/linked_contacts/fetcher';

export default function createLinkedContact(resource, resourceId, data) {
  return dispatch => {
    dispatch(
      createLinkedResourceRecordStarted(
        types.CREATE_LINK_RECORD,
        resource,
        resourceId,
        listName,
        data,
      ),
    );

    return createLinkedResourceRecord(
      resource,
      resourceId,
      listName,
      data,
    ).then(
      ({ id }) =>
        dispatch(
          createLinkedResourceRecordSucceeded(
            types.CREATE_LINK_RECORD_SUCCESS,
            resource,
            resourceId,
            listName,
            id,
          ),
        ),
      ({ errors }) =>
        dispatch(
          createLinkedResourceRecordFailed(
            types.CREATE_LINK_RECORD_FAIL,
            resource,
            resourceId,
            listName,
            errors,
          ),
        ),
    );
  };
}
