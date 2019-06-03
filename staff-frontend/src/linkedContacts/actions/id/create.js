import {
  CREATE_LINK_RECORD,
  CREATE_LINK_RECORD_SUCCESS,
  CREATE_LINK_RECORD_FAIL,
} from '../types';
import { listName } from '../../constants';
import {
  createLinkedResourceRecord,
  createLinkedResourceRecordStarted,
  createLinkedResourceRecordFailed,
  createLinkedResourceRecordSucceeded,
} from '../../../jq-redux-api/actions';

export default function createLinkedContact(resource, resourceId, data) {
  return (dispatch) => {
    dispatch(
      createLinkedResourceRecordStarted(
        CREATE_LINK_RECORD,
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
            CREATE_LINK_RECORD_SUCCESS,
            resource,
            resourceId,
            listName,
            id,
          ),
        ),
      ({ errors }) =>
        dispatch(
          createLinkedResourceRecordFailed(
            CREATE_LINK_RECORD_FAIL,
            resource,
            resourceId,
            listName,
            errors,
          ),
        ),
    );
  };
}
