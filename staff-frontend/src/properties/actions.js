import { properties } from '../api';
import {
  getPropertySuccess,
  getPropertyPending,
  getPropertyReject,
} from './actionTypes';

const getProperty = id => dispatch => {
  dispatch(getPropertyPending());
  return properties
    .getProperty(id)
    .then(({ data }) => {
      dispatch(getPropertySuccess(data));
      return Promise.resolve(data);
    })
    .catch(err => {
      dispatch(getPropertyReject());
      console.error('Ошибка загрузки данных об объекте', err);
      return Promise.reject(err);
    });
};

export default { getProperty };
