import * as types from './constants';
import {
  get, post, del, setToken,
} from '../jq-redux-api/api';
import { loadIdSucceeded } from '../users/load';

const loginStarted = () => ({
  type: types.LOGIN,
});

const loginSucceeded = ({ token }) => {
  setToken(token);

  return dispatch =>
    get('/v1/users/me').then((data) => {
      dispatch(loadIdSucceeded(data.id, data));
      return dispatch({
        type: types.LOGIN_SUCCESS,
        token,
        ...data,
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

    return post('/v1/sessions', user)
      .then((data) => {
        dispatch(loginSucceeded(data));
      })
      .catch((data) => {
        const { body } = data;
        dispatch(loginFailed(body));
        return body;
      });
  };
}

const logoutSucceeded = () => ({
  type: types.LOGOUT_SUCCESS,
});

function logout() {
  return dispatch =>
    del('/v1/sessions')
      .then(() => dispatch(logoutSucceeded()))
      .catch(() => {});
}

export { login, logout };
