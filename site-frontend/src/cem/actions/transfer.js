import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/transfer/actions';

const transferStarted = (objectKind, objectId, responsibleUserId) => ({
  type: types.TRANSFER,
  objectKind,
  objectId,
  responsibleUserId,
});

const transferSucceeded = (objectKind, objectId, responsibleUserId) => ({
  type: types.TRANSFER_SUCCESS,
  objectKind,
  objectId,
  responsibleUserId,
});

const transferFailed = (objectKind, objectId, responsibleUserId, { errors }) => ({
  type: types.TRANSFER_FAIL,
  objectKind,
  objectId,
  responsibleUserId,
  errors,
});

export default (objectKind, objectId, responsibleUserId) => (dispatch) => {
  dispatch(transferStarted(objectKind, objectId, responsibleUserId));

  return API.post(`/v1/${objectKind}/${objectId}/transfer`, { responsibleUserId })
    .then(() => {
      dispatch(pop('success', 'Передача осуществлена!'));
      dispatch(transferSucceeded(objectKind, objectId, responsibleUserId));
    })
    .catch(({ body, body: { errors = {} } }) => {
      dispatch(pop('error', 'Передача не осуществлена', errors[0] && errors[0].message));
      dispatch(transferFailed(objectKind, objectId, responsibleUserId, body));
      return body;
    });
};
