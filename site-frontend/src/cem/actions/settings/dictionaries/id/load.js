import { API } from 'core/config/sources';

import * as types from 'cem/constants/dictionaries';

const loadWordsByKindStarted = kind => ({
  type: types.LOAD_WORDS_BY_KIND,
  kind,
});

const loadWordsByKindSucceeded = (kind, data) => ({
  type: types.LOAD_WORDS_BY_KIND_SUCCESS,
  kind,
  ...data,
});

const loadWordsByKindFailed = (kind, { errors }) => ({
  type: types.LOAD_WORDS_BY_KIND_FAIL,
  kind,
  errors,
});

export default function loadWordsByKind(kind, pagination = {}) {
  return (dispatch) => {
    dispatch(loadWordsByKindStarted(kind));

    const queryParams = {
      filter: {
        kind,
      },
      pagination,
    };

    return API.get('/v1/dictionary_items', queryParams).then(
      ({ body }) => dispatch(loadWordsByKindSucceeded(kind, body)),
      ({ body }) => dispatch(loadWordsByKindFailed(kind, body)),
    );
  };
}
