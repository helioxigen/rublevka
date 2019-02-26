import { API } from 'core/config/sources';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/dictionaries';

import loadWordsByKind from './load';

const createWordStarted = key => ({
  type: types.CREATE_WORD,
  key,
});

function createWordFailed(key, { errors }) {
  return dispatch => {
    dispatch(pop('danger', 'Ошибка создания слова!'));

    return dispatch({
      type: types.CREATE_WORD_FAIL,
      key,
      errors,
    });
  };
}

export default function createWord(item) {
  return dispatch => {
    dispatch(createWordStarted());

    return API.post('/v1/dictionary_items', item).then(
      () => dispatch(loadWordsByKind(item.kind)),
      ({ body }) => {
        dispatch(createWordFailed(item.kind, body));
        return body;
      },
    );
  };
}
