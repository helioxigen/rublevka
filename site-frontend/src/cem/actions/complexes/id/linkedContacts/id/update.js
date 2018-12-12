import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexes/actions';

const updateLinkedContactStarted = id => ({
  type: types.UPDATE_LINKED_CONTACT,
  id,
});

const updateLinkedContactSucceeded = data => ({
  type: types.UPDATE_LINKED_CONTACT_SUCCESS,
  id: data.id,
  data,
});

const updateLinkedContactFailed = (id, errors) => ({
  type: types.UPDATE_LINKED_CONTACT_FAIL,
  id,
  errors,
});

export default data => (dispatch) => {
  dispatch(updateLinkedContactStarted(data.id));

  return API.put(`/v1/contacts/${data.id}`, { ...data, additionalDetails: { ...data.additionalDetails, autoRegion: data.additionalDetails ? data.additionalDetails.autoRegion : undefined } }).then(
    () => {
      dispatch(updateLinkedContactSucceeded(data));
      return data;
    },
    ({ body }) => {
      dispatch(updateLinkedContactFailed(data.id, body));
      return body;
    },
  );
};
