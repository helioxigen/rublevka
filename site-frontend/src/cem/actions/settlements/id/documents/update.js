import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import loadDocumetns from './load';

const updateDocumentsStarted = (complexId, id) => ({
  type: types.UPDATE_DOCUMENT,
  complexId,
  id,
});

const updateDocumentsFailed = (complexId, errors) => ({
  type: types.UPDATE_DOCUMENT_FAIL,
  complexId,
  errors,
});

export default function updateDocument(complexId, id, doc) {
  return (dispatch) => {
    dispatch(updateDocumentsStarted(complexId, id));

    return API.put(`/v1/places/settlements/${complexId}/documents/${id}`, doc).then(
      () => dispatch(pop('success', 'Документ успешно обновлён')) && dispatch(loadDocumetns(complexId)),
      ({ body }) => {
        dispatch(updateDocumentsFailed(complexId, body));
        return body;
      },
    );
  };
}
