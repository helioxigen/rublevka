import {
  updateLinkedResourceRecord,
  updateLinkedResourceRecordStarted,
  updateLinkedResourceRecordFailed,
  updateLinkedResourceRecordSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/linked_contacts/actions';
import { listName } from 'cem/constants/linked_contacts/fetcher';

export default function updateLinkedContact(resource, resourceId, id, data) {
  return dispatch => {
    dispatch(
      updateLinkedResourceRecordStarted(
        types.UPDATE_LINK_RECORD,
        resource,
        resourceId,
        listName,
        id,
        data,
      ),
    );

    return updateLinkedResourceRecord(
      resource,
      resourceId,
      listName,
      id,
      data,
    ).then(
      () =>
        dispatch(
          updateLinkedResourceRecordSucceeded(
            types.UPDATE_LINK_RECORD_SUCCESS,
            resource,
            resourceId,
            listName,
            id,
            data,
          ),
        ),
      ({ errors }) =>
        dispatch(
          updateLinkedResourceRecordFailed(
            types.UPDATE_LINK_RECORD_FAIL,
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
