import { API } from 'core/config/sources';

import * as types from 'cem/constants/companies/actions';

const updateLinkedContactStarted = (companyId, id) => ({
  type: types.UPDATE_LINKED_CONTACT,
  companyId,
  id,
});

const updateLinkedContactSucceeded = (companyId, data) => ({
  type: types.UPDATE_LINKED_CONTACT_SUCCESS,
  companyId,
  id: data.id,
  data,
});

const updateLinkedContactFailed = (companyId, id, errors) => ({
  type: types.UPDATE_LINKED_CONTACT_FAIL,
  companyId,
  id,
  errors,
});

export default (companyId, data) => dispatch => {
  dispatch(updateLinkedContactStarted(data.id));

  return API.put(`/v1/contacts/${data.id}`, {
    ...data,
    additionalDetails: {
      ...data.additionalDetails,
      autoRegion: data.additionalDetails
        ? data.additionalDetails.autoRegion
        : undefined,
    },
    companyDetails: { ...data.companyDetails, companyId },
  }).then(
    () => {
      dispatch(updateLinkedContactSucceeded(companyId, data));
      return data;
    },
    ({ body }) => {
      dispatch(updateLinkedContactFailed(companyId, data.id, body));
      return body;
    },
  );
};
