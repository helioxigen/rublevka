import { API } from 'core/config/sources';

import * as types from 'cem/constants/contacts';

const loadContactStarted = id => ({
  type: types.LOAD_CONTACT,
  id,
});

export const loadContactSucceeded = (id, data) => ({
  type: types.LOAD_CONTACT_SUCCESS,
  id,
  data,
});

const loadContactFailed = (id, errors) => ({
  type: types.LOAD_CONTACT_FAIL,
  id,
  errors,
});

export default id => (dispatch) => {
  dispatch(loadContactStarted(id));

  return API.get(`/v1/contacts/${id}`).then(
    ({ body }) => {
      dispatch(loadContactSucceeded(id, body));
      return body;
    },
    ({ body }) => {
      dispatch(loadContactFailed(id, body));
      return body;
    },
  );
};
