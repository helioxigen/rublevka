// import { API } from 'core/config/sources';

// import * as types from 'cem/constants/properties/actions';

// import { pop } from 'cem/actions/toastr';

// import { transform, normalizePhoneNumber } from 'cem/_contacts/old_actions/helpers';

// const createContactStarted = () => ({ type: types.CREATE_CONTACT });

// export default values => (dispatch) => {
//   const { photo, ...otherValues } = values; // eslint-disable-line no-unused-vars

//   dispatch(createContactStarted());

//   return API.post('/v1/contacts', transform(otherValues)).then(
//     ({ headers }) => API.get(headers.location).then(({ body: { id } }) => id),
//     ({ body: { errors } }) => {
//       if (
//         errors &&
//         errors.some(error => error.param === 'details.phoneNumber' || error.param === 'phoneNumber')
//       ) {
//         return API.get('/v1/contacts', {
//           filter: { 'details.phoneNumber': normalizePhoneNumber(otherValues.details.phoneNumber) },
//         }).then(
//           ({ body }) => {
//             const data = body.items[0];
//             dispatch(
//               pop(
//                 'info',
//                 `Под таким номером телефона записан ${data.details.firstName} ${
//                   data.details.lastName
//                 }`,
//               ),
//             );
//             return data.id;
//           },
//           ({ body }) => Promise.reject(body),
//         );
//       }
//       return Promise.reject({ errors });
//     },
//   );
// };
