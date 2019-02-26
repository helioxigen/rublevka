import { API } from 'core/config/sources';

import updateComplex from 'cem/actions/complexes/id/update';
import { pop } from 'cem/actions/toastr';

import { normalizePhoneNumber } from 'cem/_contacts/old_actions/helpers';

import * as types from 'cem/constants/complexes/actions';

const createContactStarted = () => ({
  type: types.CREATE_CONTACT,
});

const createContactSucceeded = data => ({
  type: types.CREATE_CONTACT_SUCCESS,
  id: data.id,
  data,
});

const createContactFailed = errors => ({
  type: types.CREATE_CONTACT_FAIL,
  errors,
});

export default (complexData, data) => dispatch => {
  dispatch(createContactStarted());

  return API.post('/v1/contacts', {
    ...data,
    additionalDetails: { autoRegion: undefined },
    companyDetails: {},
  }).then(
    ({ headers }) =>
      API.get(headers.location).then(({ body }) => {
        dispatch(
          updateComplex(complexData.id, {
            ...complexData,
            linkedContactIds: [...complexData.linkedContactIds, body.id],
          }),
        ).then(() => dispatch(createContactSucceeded(body)));
        return body;
      }),
    // NOTE This beast mimics the one from "cem/actions/properties/contacts/create.js"
    // TODO Refactor these...
    ({ body: { errors } }) => {
      if (
        errors &&
        errors.some(
          error =>
            error.param === 'details.phoneNumber' ||
            error.param === 'phoneNumber',
        )
      ) {
        return API.get('/v1/contacts', {
          filter: {
            'details.phoneNumber': normalizePhoneNumber(
              data.details.phoneNumber,
            ),
          },
        }).then(
          ({ body }) => {
            const existingContactData = body.items[0];
            dispatch(
              pop(
                'info',
                `Под таким номером телефона записан ${
                  existingContactData.details.firstName
                } ${existingContactData.details.lastName}`,
              ),
            );
            dispatch(
              updateComplex(complexData.id, {
                ...complexData,
                linkedContactIds: [
                  ...complexData.linkedContactIds,
                  existingContactData.id,
                ],
              }),
            ).then(() => dispatch(createContactSucceeded(body)));
            return existingContactData;
          },
          ({ body }) => {
            dispatch(createContactFailed(body));
            return Promise.reject(body);
          },
        );
      }
      dispatch(createContactFailed({ errors }));
      return Promise.reject({ errors });
    },
  );
};
