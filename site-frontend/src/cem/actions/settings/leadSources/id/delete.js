import * as types from 'cem/constants/leadSources';
import { API } from 'core/config/sources';

import loadList from '../list/load';
import { pop } from 'cem/actions/toastr';

const deleteIdStarted = id => ({
  type: types.CREATE_ID,
  id,
});

const deleteIdSucceeded = () => (dispatch) => {
  dispatch(pop('success', 'Источник удалён'));

  return dispatch(loadList());
};

const deleteIdFailed = ({ errors }) => (dispatch) => {
  dispatch(pop('error', 'Произошла ошибка'));

  return dispatch({
    type: types.CREATE_ID_FAIL,
    errors,
  });
};

export default function ({ id }) {
  return (dispatch) => {
    dispatch(deleteIdStarted(id));

    return API.del(`/v1/client_lead_sources/${id}`)
      .then(() => dispatch(deleteIdSucceeded()))
      .catch(({ body }) => dispatch(deleteIdFailed(body)));
  };
}
