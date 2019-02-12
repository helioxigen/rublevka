import * as types from 'site/constants/email/actions';
import { API } from 'core/config/sources';
import global from 'window-or-global';

const subscribeStarted = (name, email) => ({
  type: types.SUBSCRIBE,
  name,
  email,
});

const subscribeSucceeded = (name, email) => ({
  type: types.SUBSCRIBE_SUCCESS,
  name,
  email,
});

const subscribeFailed = (name, email, { errors }) => ({
  type: types.SUBSCRIBE_FAIL,
  name,
  email,
  errors,
});

export function subscribe(name, email) {
  return dispatch => {
    dispatch(subscribeStarted);

    return API.post('/v1/mail/subscribe', {
      name,
      email,
      source: global.config.domain,
    })
      .then(() => dispatch(subscribeSucceeded(name, email)))
      .catch(({ body }) => dispatch(subscribeFailed(name, email, body)));
  };
}

const notifyStarted = (title, body) => ({
  type: types.NOTIFY,
  title,
  body,
});

const notifySucceeded = email => ({
  type: types.NOTIFY_SUCCESS,
  email,
});

const notifyFailed = (email, { errors }) => ({
  type: types.NOTIFY_FAIL,
  email,
  errors,
});

export function notify(title, body, email) {
  return dispatch => {
    dispatch(notifyStarted(title, body));

    return API.post('/v1/mail/notify', { title, body })
      .then(() => dispatch(notifySucceeded(email)))
      .catch(res => dispatch(notifyFailed(email, res.body)));
  };
}
