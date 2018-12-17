import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import loadDocumetns from './load';

const deleteDocumentsStarted = (complexId, id) => ({
  type: types.DELETE_DOCUMENT,
  complexId,
  id,
});

const deleteDocumentsFailed = (complexId, errors) => ({
  type: types.DELETE_DOCUMENT_FAIL,
  complexId,
  errors,
});

export default function deleteDocument(complexId, id) {
  return (dispatch) => {
    dispatch(deleteDocumentsStarted(complexId, id));

    return API.del(`/v1/places/settlements/${complexId}/documents/${id}`).then(
      () =>
        dispatch(pop('success', 'Документ успешно удалён')) && dispatch(loadDocumetns(complexId)),
      ({ body }) => {
        dispatch(deleteDocumentsFailed(complexId, body));
        return body;
      },
    );
  };
}
