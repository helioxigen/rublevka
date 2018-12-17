import { API } from 'core/config/resources';
import store from 'cem/store';

import fetch from 'isomorphic-fetch';
import { makeFilterRange, formatFilterDate } from 'core/helpers';

export function uploadFile(id, file) {
  const formData = new FormData();
  formData.append('file', file[0]);

  const {
    auth: { token },
  } = store.getState();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API}/v1/tasks/${id}/document`, {
    method: 'post',
    headers,
    body: formData,
  }).then(response => response.headers.get('location'));
}

export const mapFilter = (filter = {}) => {
  const { deadlineFrom, deadlineTo, ...params } = filter;

  return {
    ...params,
    deadline: makeFilterRange(
      deadlineFrom && formatFilterDate(deadlineFrom),
      deadlineTo && formatFilterDate(deadlineTo),
    ),
  };
};
