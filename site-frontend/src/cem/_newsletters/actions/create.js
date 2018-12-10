import {
  createElement,
  createElementStarted,
  createElementFailed,
  createElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_newsletters/constants/actions';
import { apiPath } from 'cem/_newsletters/constants/defaults';

import transformOutputValues
  from 'cem/_newsletters/helpers/transformOutputValues';

export default data => (dispatch) => {
  dispatch(createElementStarted(types.CREATE_NEWSLETTER));

  const values = transformOutputValues(data);

  return createElement(apiPath, values).then(
    ({ id }) => {
      dispatch(createElementSucceeded(types.CREATE_NEWSLETTER_SUCCEEDED, id));
      return { id };
    },
    (errors) => {
      dispatch(createElementFailed(types.CREATE_NEWSLETTER_FAILED, errors));
      return { errors };
    },
  );
};
