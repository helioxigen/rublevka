import {
  updateElement,
  updateElementStarted,
  updateElementFailed,
  updateElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_newsletters/constants/actions';
import { apiPath } from 'cem/_newsletters/constants/defaults';

import transformOutputValues
  from 'cem/_newsletters/helpers/transformOutputValues';

export default (id, data) => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE_NEWSLETTER, id));

  const values = transformOutputValues(data);

  return updateElement(apiPath, id, values).then(
    () => {
      dispatch(updateElementSucceeded(types.UPDATE_NEWSLETTER_SUCCEEDED, id));

      return { id };
    },
    (errors) => {
      dispatch(updateElementFailed(types.UPDATE_NEWSLETTER_FAILED, errors));
      return { errors };
    },
  );
};
