import * as types from '../constants/actions';
import { apiPath } from '../constants/defaults';
import { transformOutputValues } from '../helpers';
import {
  updateElement,
  updateElementStarted,
  updateElementFailed,
  updateElementSucceeded,
} from '../../jq-redux-api/actions';

export default (id, data) => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE, id));

  return updateElement(apiPath, id, transformOutputValues(data))
    .then((resp) => {
      dispatch(updateElementSucceeded(types.UPDATE_SUCCEEDED, id));
      return resp;
    })
    .catch((errors) => {
      dispatch(updateElementFailed(types.UPDATE_FAILED, id, errors));
      return { errors };
    });
};
