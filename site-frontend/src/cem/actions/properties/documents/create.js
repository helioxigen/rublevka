import { API } from 'core/config/sources';
import { uploadFile } from '../helpers';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/properties/actions';

import updateDocument from './update';

const linkDocumentStarted = propertyId => ({
  type: types.LINK_DOCUMENT,
  propertyId,
});

const linkDocumentFailed = (propertyId, errors) => ({
  type: types.LINK_DOCUMENT_FAIL,
  propertyId,
  errors,
});

export default function (propertyId, { file, ...data }, category = 'city') {
  return (dispatch) => {
    dispatch(linkDocumentStarted(propertyId));
    dispatch(pop('success', 'Загрузка документа начата'));

    return uploadFile(propertyId, file, category).then(
      location => API.get(location).then(({ body }) => dispatch(updateDocument(propertyId, body.id, data))),
      ({ body }) => {
        dispatch(linkDocumentFailed(propertyId, body));
        return body;
      },
    );
  };
}
