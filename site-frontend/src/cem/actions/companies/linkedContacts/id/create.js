import { API } from 'core/config/sources';

import * as types from 'cem/constants/companies/actions';

import { normalizePhoneNumber } from 'cem/_contacts/old_actions/helpers';

import { pop } from 'cem/actions/toastr';
import updateLinkedContact from './update';

const createContactStarted = companyId => ({
  type: types.CREATE_CONTACT,
  companyId,
});

const createContactSucceeded = (companyId, data) => ({
  type: types.CREATE_CONTACT_SUCCESS,
  companyId,
  id: data.id,
  data,
});

const createContactFailed = (companyId, errors) => ({
  type: types.CREATE_CONTACT_FAIL,
  companyId,
  errors,
});

export default (companyId, data) => (dispatch) => {
  dispatch(createContactStarted(companyId));

  return API.post('/v1/contacts', {
    ...data,
    additionalDetails: { autoRegion: undefined },
    companyDetails: { ...data.companyDetails, companyId },
  }).then(
    ({ headers }) =>
      API.get(headers.location).then(({ body }) => {
        dispatch(createContactSucceeded(companyId, body));
        return body;
      }),
    // NOTE This beast mimics the one from "cem/actions/properties/contacts/create.js"
    // TODO Refactor these...
    ({ body: { errors } }) => {
      if (
        errors &&
        errors.some(error => error.param === 'details.phoneNumber' || error.param === 'phoneNumber')
      ) {
        return API.get('/v1/contacts', {
          filter: { 'details.phoneNumber': normalizePhoneNumber(data.details.phoneNumber) },
        }).then(
          ({ body }) => {
            const existingContactData = body.items[0];
            dispatch(
              pop(
                'info',
                `Под таким номером телефона записан ${existingContactData.details.firstName} ${
                  existingContactData.details.lastName
                }`,
              ),
            );
            dispatch(updateLinkedContact(companyId, existingContactData));
            dispatch(createContactSucceeded(companyId, body));
            return existingContactData;
          },
          ({ body }) => {
            dispatch(createContactFailed(companyId, body));
            return Promise.reject(body);
          },
        );
      }
      dispatch(createContactFailed(companyId, { errors }));
      return Promise.reject({ errors });
    },
  );
};
