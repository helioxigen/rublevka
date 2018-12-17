import fetch from 'isomorphic-fetch';
import { API } from 'core/config/resources';
import store from 'cem/store';
import { formatDateToDay } from 'core/helpers';

export const transform = ({
  details,
  details: { adPhoneNumbers = [], startedWorkAt, finishedWorkAt },
  ...data
}) => ({
  ...data,
  details: {
    ...details,
    adPhoneNumbers,
    startedWorkAt: formatDateToDay(startedWorkAt),
    finishedWorkAt: formatDateToDay(finishedWorkAt),
  },
});

export function uploadPhoto(id, images) {
  if (images) {
    const {
      auth: { token },
    } = store.getState();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = new FormData();
    body.append('file', images[0]);

    // TODO: FETCH IS LEGACY NEED REWRITE
    return fetch(`${API}/v1/users/staff/${id}/photo`, {
      method: 'post',
      headers,
      body,
    });
  }
  return new Promise(resolve => resolve());
}

export function uploadFile(id, file, type = 'documents') {
  const {
    auth: { token },
  } = store.getState();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const body = new FormData();
  body.append('file', file[0]);

  return fetch(`${API}/v1/users/staff/${id}/${type}`, {
    method: 'post',
    headers,
    body,
  }).then(response => response.headers.get('location'));
}
