import { API } from 'core/config/sources';
import * as types from 'cem/constants/csi/actions';

const deleteQuestionStarted = id => ({
  type: types.DELETE_QUESTION,
  id,
});

const deleteQuestionSucceeded = id => ({
  type: types.DELETE_QUESTION_SUCCESS,
  id,
});

const deleteQuestionFailed = (id, { errors }) => ({
  type: types.DELETE_QUESTION_FAIL,
  id,
  errors,
});

export default function deleteQuestsions(id) {
  return (dispatch) => {
    dispatch(deleteQuestionStarted(id));

    return API.del(`/v1/csi/questions/${id}`)
      .then(() => dispatch(deleteQuestionSucceeded()))
      .catch(({ body }) => dispatch(deleteQuestionFailed(id, body)));
  };
}
