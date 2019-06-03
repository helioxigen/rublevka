import * as types from '../constants';
import { get } from '../../jq-redux-api/api';

import { logout } from '../../auth/actions';

const loadIdStarted = id => ({
  type: types.LOAD_ID,
  id,
});

export const loadIdSucceeded = (id, data) => (dispatch) => {
  dispatch({
    type: types.LOAD_ID_SUCCESS,
    id,
    data,
  });
};

const loadIdFailed = (id, errors) => ({
  type: types.LOAD_ID_FAIL,
  id,
  errors,
});

export const loadUser = id => (dispatch) => {
  dispatch(loadIdStarted(id));

  return get(`/v1/users/staff/${id}`).then(
    data => dispatch(loadIdSucceeded(id, data)),
    data => dispatch(loadIdFailed(id, data)),
  );
};

const loadCurrentUserSucceeded = ({
  id, email, state, ...data
}) => ({
  type: types.LOAD_CURRENT_USER_SUCCESS,
  firstName: data.firstName,
  lastName: data.lastName,
  id,
});

export const loadCurrentUser = () => dispatch =>
  get('/v1/users/me')
    .then((result) => {
      dispatch(loadIdSucceeded(result.id, result));
      return dispatch(loadCurrentUserSucceeded(result));
    })
    .catch(({ status }) => {
      if (status >= 400 && status < 500) dispatch(logout());
    });
