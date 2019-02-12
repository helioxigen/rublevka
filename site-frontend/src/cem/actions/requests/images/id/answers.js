import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/images/actions';

const loadAnswersStarted = requestId => ({
  type: types.LOAD_ANSWERS,
  requestId,
});

const loadAnswersSucceeded = (requestId, { answers }) => ({
  type: types.LOAD_ANSWERS_SUCCESS,
  requestId,
  answers,
});

const loadAnswersFailed = (requestId, { errors }) => ({
  type: types.LOAD_ANSWERS_FAIL,
  requestId,
  errors,
});

export default function loadAnswers(requestId) {
  return dispatch => {
    dispatch(loadAnswersStarted(requestId));

    return API.get(`/v1/orders/images/${requestId}/answers`)
      .then(({ body }) => dispatch(loadAnswersSucceeded(requestId, body)))
      .catch(({ body }) => dispatch(loadAnswersFailed(requestId, body)));
  };
}
