import { API } from 'core/config/sources';
import * as types from 'cem/constants/csi/actions';

const createQuestionStarted = data => ({
  type: types.CREATE_QUESTION,
  data,
});

const createQuestionSucceeded = data => ({
  type: types.CREATE_QUESTION_SUCCESS,
  data,
});

const createQuestionFailed = ({ errors }) => ({
  type: types.CREATE_QUESTION_FAIL,
  errors,
});

export default function createQuestsion(data) {
  return dispatch => {
    dispatch(createQuestionStarted(data));

    return API.post('/v1/csi/questions', data)
      .then(({ body }) => dispatch(createQuestionSucceeded(body)))
      .catch(({ body }) => dispatch(createQuestionFailed(body)));
  };
}
