import {
  DELETE_LINK_RECORD,
  DELETE_LINK_RECORD_SUCCESS,
  DELETE_LINK_RECORD_FAIL,
} from '../types';
import { listName } from '../../constants';
import {
  deleteLinkedResourceRecordStarted,
  deleteLinkedResourceRecord,
  deleteLinkedResourceRecordSucceeded,
  deleteLinkedResourceRecordFailed,
} from '../../../jq-redux-api/actions';

export default function deleteLinkedContact(resource, resourceId, id) {
  return (dispatch) => {
    dispatch(
      deleteLinkedResourceRecordStarted(
        DELETE_LINK_RECORD,
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
            DELETE_LINK_RECORD_SUCCESS,
            resource,
            resourceId,
            listName,
            id,
          ),
        ),
      ({ errors }) =>
        dispatch(
          deleteLinkedResourceRecordFailed(
            DELETE_LINK_RECORD_FAIL,
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
