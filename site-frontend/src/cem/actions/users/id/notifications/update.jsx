import { API } from 'core/config/sources';
import * as types from 'cem/constants/users/actions';

const updateStarted = data => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS,
  data,
});

const updateSucceeded = () => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
});

const updateFailed = ({ errors }) => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
  errors,
});

export default function updateNotificationSettings(data) {
  return (dispatch) => {
    dispatch(updateStarted(data));

    return API.put('/v1/users/me/settings/notifications', data)
      .then(() => dispatch(updateSucceeded()))
      .catch(({ body }) => dispatch(updateFailed(body)));
  };
}
