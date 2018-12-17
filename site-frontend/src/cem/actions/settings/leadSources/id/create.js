import * as types from 'cem/constants/leadSources';
import { API } from 'core/config/sources';

import loadList from '../list/load';
import { pop } from 'cem/actions/toastr';

const createIdStarted = data => ({
  type: types.CREATE_ID,
  data,
});

const createIdSucceeded = () => (dispatch) => {
  dispatch(pop('success', 'Источник создан'));

  return dispatch(loadList());
};

const createIdFailed = ({ errors }) => (dispatch) => {
  dispatch(pop('error', 'Произошла ошибка'));

  return dispatch({
    type: types.CREATE_ID_FAIL,
    errors,
  });
};

export default function (lead) {
  return (dispatch) => {
    dispatch(createIdStarted(lead));

    return API.post('/v1/client_lead_sources', lead)
      .then(() => dispatch(createIdSucceeded()))
      .catch(({ body }) => dispatch(createIdFailed(body)));
  };
}
