import { API } from 'core/config/sources';
import * as types from 'cem/constants/users/actions';

const loadStarted = () => ({
  type: types.LOAD_NOTIFICATION_SETTINGS,
});

const loadSucceeded = data => ({
  type: types.LOAD_NOTIFICATION_SETTINGS_SUCCESS,
  data,
});

const loadFailed = ({ errors }) => ({
  type: types.LOAD_NOTIFICATION_SETTINGS_SUCCESS,
  errors,
});

export default function loadNotificationSettings() {
  return (dispatch) => {
    dispatch(loadStarted());

    return API.get('/v1/users/me/settings/notifications')
      .then(({ body }) => dispatch(loadSucceeded(body)))
      .catch(({ body }) => dispatch(loadFailed(body)));
  };
}
