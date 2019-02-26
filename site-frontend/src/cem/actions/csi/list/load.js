import { API } from 'core/config/sources';

import * as types from 'cem/constants/csi/actions';
import { getFilterByKind } from 'cem/helpers/csi';

const loadQuestionsStarted = kind => ({
  type: types.LOAD_QUESTIONS,
  kind,
});

const loadQuestionsSucceeded = (kind, { items }) => ({
  type: types.LOAD_QUESTIONS_SUCCESS,
  kind,
  items,
});

const loadQuestionsFailed = (kind, { errors }) => ({
  type: types.LOAD_QUESTIONS_FAIL,
  kind,
  errors,
});

export default kind => dispatch => {
  dispatch(loadQuestionsStarted(kind));

  return API.get('/v1/csi/questions', { filter: getFilterByKind(kind) })
    .then(({ body }) => dispatch(loadQuestionsSucceeded(kind, body)))
    .catch(({ body }) => dispatch(loadQuestionsFailed(kind, body)));
};
