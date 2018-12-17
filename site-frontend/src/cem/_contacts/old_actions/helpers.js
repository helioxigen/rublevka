import fetch from 'isomorphic-fetch';
import { API } from 'core/config/resources';
import { formHelpers } from 'cem/helpers';
import store from 'cem/store';

import replace from 'lodash/replace';

// TODO: rewrite
export const transform = data => ({
  ...data,
  additionalDetails: {
    ...data.additionalDetails,
    autoRegion: data.additionalDetails
      ? formHelpers.normalizeNumber(data.additionalDetails.autoRegion)
      : undefined,
  },
  companyDetails: {
    ...data.companyDetails,
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
    return fetch(`${API}/v1/contacts/${id}/photo`, {
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

  return fetch(`${API}/v1/contacts/${id}/${type}`, {
    method: 'post',
    headers,
    body,
  }).then(response => response.headers.get('location'));
}

export const mapFilters = ({ name, ...filters }) => ({
  ...filters,
  'details.firstName,details.middleName,details.lastName': name ? `*${name}*` : undefined,
  'details.phoneNumber': filters['details.phoneNumber']
    ? `*${filters['details.phoneNumber']}*`
    : undefined,
  'details.email': filters['details.email'] ? `*${filters['details.email']}*` : undefined,
});

export const normalizePhoneNumber = value =>
  replace(value, new RegExp('(\\-|\\+|\\(|\\)|\\s)', 'g'), '');
