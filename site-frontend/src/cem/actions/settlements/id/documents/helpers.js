import { API } from 'core/config/resources';
import store from 'cem/store';

import fetch from 'isomorphic-fetch';

export function uploadFile(id, file, type = 'documents') {
  const formData = new FormData();
  formData.append('file', file[0]);

  const {
    auth: { token },
  } = store.getState();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API}/v1/places/settlements/${id}/${type}`, {
    method: 'post',
    headers,
    body: formData,
  }).then(response => response.headers.get('location'));
}
