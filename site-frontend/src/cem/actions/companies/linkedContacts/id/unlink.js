import { API } from 'core/config/sources';

import * as types from 'cem/constants/companies/actions';

const unlinkContactStarted = (companyId, id) => ({
  type: types.UNLINK_CONTACT,
  companyId,
  id,
});

const unlinkContactSucceeded = (companyId, id) => ({
  type: types.UNLINK_CONTACT_SUCCESS,
  companyId,
  id,
});

const unlinkContactFailed = (companyId, id, errors) => ({
  type: types.UNLINK_CONTACT_FAIL,
  companyId,
  id,
  errors,
});

export default (companyId, data) => dispatch => {
  dispatch(unlinkContactStarted(data.id));

  return API.put(`/v1/contacts/${data.id}`, {
    ...data,
    companyDetails: { ...data.companyDetails, companyId: undefined },
  }).then(
    () => {
      dispatch(unlinkContactSucceeded(companyId, data.id));
      return data.id;
    },
    ({ body }) => {
      dispatch(unlinkContactFailed(companyId, data.id, body));
      return body;
    },
  );
};
