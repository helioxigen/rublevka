import set from 'lodash/set';

import { API } from 'core/config/sources';
import * as types from 'cem/constants/users/actions';
import notificationsList from 'cem/constants/users/notifications/list';

import { pushPath } from 'redux-simple-router';
import { transform, uploadPhoto } from './helpers';

// create user
const createIdStarted = () => ({
  type: types.CREATE_ID,
});

const createIdSucceeded = (id, images) => dispatch =>
  uploadPhoto(id, images).then(() => {
    dispatch(pushPath(`/staff/${id}`));

    return dispatch({
      type: types.CREATE_ID_SUCCESS,
    });
  });

const createIdFailed = errors => ({
  type: types.CREATE_ID_FAIL,
  errors,
});

export default function createUser({ photo, ...data }) {
  return (dispatch) => {
    dispatch(createIdStarted());
    notificationsList.map(item => set(data.details, item.key, item.default));

    return API.post('/v1/users/staff', transform({ ...data })).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body: { id } }) =>
          dispatch(createIdSucceeded(id, photo)),
        ),
      ({ body }) => {
        dispatch(createIdFailed(body));
        return body;
      },
    );
  };
}
