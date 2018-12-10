import * as types from 'cem/constants/leadSources';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

const updateIdStarted = id => ({
  type: types.UPDATE_ID,
  id,
});

const updateIdSucceeded = id => (dispatch) => {
  dispatch(pop('success', 'Источник обновлён'));

  return dispatch({
    type: types.UPDATE_ID_SUCCESS,
    id,
  });
};

const updateIdFailed = (id, { errors }) => (dispatch) => {
  dispatch(pop('error', 'Произошла ошибка'));

  return dispatch({
    type: types.UPDATE_ID_FAIL,
    id,
    errors,
  });
};

export default function (id, leadSource) {
  return (dispatch) => {
    dispatch(updateIdStarted(id));

    return API.put(`/v1/client_lead_sources/${id}`, leadSource)
      .then(() => dispatch(updateIdSucceeded(id)))
      .catch(({ body }) => dispatch(updateIdFailed(id, body)));
  };
}
