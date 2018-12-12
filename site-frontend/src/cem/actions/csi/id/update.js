import { API } from 'core/config/sources';
import * as types from 'cem/constants/csi/actions';

const updateQuestionStarted = (id, data) => ({
  type: types.UPDATE_QUESTION,
  id,
  data,
});

const updateQuestionSucceeded = id => ({
  type: types.UPDATE_QUESTION_SUCCESS,
  id,
});

const updateQuestionFailed = (id, { errors }) => ({
  type: types.UPDATE_QUESTION_FAIL,
  id,
  errors,
});

export default function updateQuestsions(id, data) {
  return (dispatch) => {
    dispatch(updateQuestionStarted(id, data));

    return API.put(`/v1/csi/questions/${id}`, data)
      .then(() => dispatch(updateQuestionSucceeded(id)))
      .catch(({ body }) => dispatch(updateQuestionFailed(id, body)));
  };
}
