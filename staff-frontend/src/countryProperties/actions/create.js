import * as types from '../constants/actions';
import { apiPath } from '../constants/defaults';
import { transformOutputValues } from '../helpers';
import {
  createElement,
  createElementStarted,
  createElementSucceeded,
  createElementFailed,
} from '../../jq-redux-api/actions';

export default data => (dispatch) => {
  dispatch(createElementStarted(types.CREATE, data));

  return createElement(apiPath, transformOutputValues(data))
    .then((resp) => {
      dispatch(createElementSucceeded(types.CREATE_SUCCEEDED));
      console.log('create succ', resp);
      return Promise.resolve(resp);
    })
    .catch((errors) => {
      dispatch(createElementFailed(types.CREATE_FAILED, errors));
      console.log('create fail', errors);
      return Promise.reject(errors);
    });
};
