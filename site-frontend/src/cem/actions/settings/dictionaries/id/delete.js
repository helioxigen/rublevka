import { API } from 'core/config/sources';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/dictionaries';

import loadWordsByKind from './load';

const deleteWordStarted = key => ({
  type: types.DELETE_WORD,
  key,
});

function deleteWordFailed(key, { errors }) {
  return (dispatch) => {
    dispatch(pop('danger', 'Ошибка удаления слова!'));

    return dispatch({
      type: types.DELETE_WORD_FAIL,
      key,
      errors,
    });
  };
}

export default function deleteWord({ id, kind }) {
  return (dispatch) => {
    dispatch(deleteWordStarted());

    return API.del(`/v1/dictionary_items/${id}`).then(
      () => dispatch(loadWordsByKind(kind)),
      ({ body }) => {
        dispatch(deleteWordFailed(kind, body));
        return body;
      },
    );
  };
}
