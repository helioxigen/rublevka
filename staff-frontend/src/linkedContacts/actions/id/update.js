import {
  UPDATE_LINK_RECORD,
  UPDATE_LINK_RECORD_SUCCESS,
  UPDATE_LINK_RECORD_FAIL,
} from '../types';
import { listName } from '../../constants';
import {
  updateLinkedResourceRecordStarted,
  updateLinkedResourceRecord,
  updateLinkedResourceRecordSucceeded,
  updateLinkedResourceRecordFailed,
} from '../../../jq-redux-api/actions';

export default function updateLinkedContact(resource, resourceId, id, data) {
  return (dispatch) => {
    dispatch(
      updateLinkedResourceRecordStarted(
        UPDATE_LINK_RECORD,
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
            UPDATE_LINK_RECORD_SUCCESS,
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
            UPDATE_LINK_RECORD_FAIL,
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
