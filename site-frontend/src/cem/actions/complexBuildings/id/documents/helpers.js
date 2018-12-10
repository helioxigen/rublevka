import { API } from 'core/config/resources';
import store from 'cem/store';

import fetch from 'isomorphic-fetch';

export function uploadFile(complexBuildingId, file, type = 'documents') {
  const formData = new FormData();
  formData.append('file', file[0]);

  return fetch(`${API}/v1/complex_buildings/${complexBuildingId}/${type}`, {
    method: 'post',
    headers: { Authorization: `Bearer ${store.getState().auth.token}` },
    body: formData,
  }).then(response => response.headers.get('location'));
}
