import { API } from 'core/config/sources';
import * as types from 'cem/constants/csi/actions';
import paths from 'cem/constants/csi/paths';

const loadAnswersStarted = (kind, requestId) => ({
  type: types.LOAD_ANSWERS,
  kind,
  requestId,
});

const loadAnswersSucceeded = (kind, requestId, { answers }) => ({
  type: types.LOAD_ANSWERS_SUCCESS,
  kind,
  requestId,
  answers,
});

const loadAnswersFailed = (kind, requestId, { errors }) => ({
  type: types.LOAD_ANSWERS_FAIL,
  kind,
  requestId,
  errors,
});

export default function loadAnswers(kind, requestId) {
  return dispatch => {
    dispatch(loadAnswersStarted(kind, requestId));
    const url = paths[kind](requestId);

    return API.get(url)
      .then(({ body }) => dispatch(loadAnswersSucceeded(kind, requestId, body)))
      .catch(({ body }) => dispatch(loadAnswersFailed(kind, requestId, body)));
  };
}
