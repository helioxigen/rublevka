import { API } from 'core/config/sources';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/dictionaries';

import loadWordsByKind from './load';

const updateWordStarted = key => ({
  type: types.UPDATE_WORD,
  key,
});

function updateWordFailed(key, { errors }) {
  return (dispatch) => {
    dispatch(pop('danger', 'Ошибка обновления слова!'));

    return dispatch({
      type: types.UPDATE_WORD_FAIL,
      key,
      errors,
    });
  };
}

export default function updateWord(item) {
  return (dispatch) => {
    dispatch(updateWordStarted());

    return API.put(`/v1/dictionary_items/${item.id}`, item).then(
      () => dispatch(loadWordsByKind(item.kind)),
      ({ body }) => {
        dispatch(updateWordFailed(item.kind, body));
        return body;
      },
    );
  };
}
