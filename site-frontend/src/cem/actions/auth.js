import { API } from 'core/config/sources';
import { loadIdSucceeded } from 'cem/actions/users/id/load';
import * as types from 'cem/constants/auth';

const loginStarted = () => ({
  type: types.LOGIN,
});

const loginSucceeded = ({ token }) => {
  API.setHeader('Authorization', `Bearer ${token}`);

  return dispatch =>
    API.get('/v1/users/me').then(({ body }) => {
      dispatch(loadIdSucceeded(body.id, body));
      return dispatch({
        type: types.LOGIN_SUCCESS,
        token,
        ...body,
      });
    });
};

const loginFailed = ({ errors }) => ({
  type: types.LOGIN_FAIL,
  errors,
});

function login(user) {
  return (dispatch) => {
    dispatch(loginStarted());

    return API.post('/v1/sessions', user).then(
      ({ body }) => dispatch(loginSucceeded(body)),
      ({ body }) => {
        dispatch(loginFailed(body));
        return body;
      },
    );
  };
}

const logoutSucceeded = () => ({
  type: types.LOGOUT_SUCCESS,
});

function logout() {
  return dispatch =>
    API.del('/v1/sessions').catch(() => {}).then(() => dispatch(logoutSucceeded()));
}

const loginAsUserSucceeded = data => ({
  type: types.LOGIN_AS_USER_SUCCESS,
  data,
});

const loginAsUser = data => (dispatch) => {
  API.setHeader('X-Sign-As-User-Id', data.id);

  return Promise.resolve(dispatch(loginAsUserSucceeded(data)));
};

const logoutAsUserSucceeded = () => ({
  type: types.LOGOUT_AS_USER_SUCCESS,
});

const logoutAsUser = () => (dispatch) => {
  API.deleteHeader('X-Sign-As-User-Id');

  return Promise.resolve(dispatch(logoutAsUserSucceeded()));
};

export { login, logout, loginAsUser, logoutAsUser };
