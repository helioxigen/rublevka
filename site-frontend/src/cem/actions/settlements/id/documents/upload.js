import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import loadDocuments from './load';
import { uploadFile } from './helpers';

const uploadDocumenStarted = id => ({
  type: types.UPLOAD_DOCUMENT,
  id,
});

export default function uploadDocument(id, { file, ...data }) {
  return (dispatch) => {
    dispatch(uploadDocumenStarted(id));

    return uploadFile(id, file).then(location =>
      API.put(location, data).then(
        () => dispatch(pop('success', 'Документ успешно загружен')) && dispatch(loadDocuments(id)),
      ),
    );
  };
}
