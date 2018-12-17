import moment from 'moment';

import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_newsletters/constants/actions';
import { apiPath } from 'cem/_newsletters/constants/defaults';

import { formatDateToDay } from 'core/helpers';

const transformInputValues = values => ({
  ...values,
  scheduledAtDate: formatDateToDay(values.scheduledAt),
  scheduledAtTime: moment(values.scheduledAt).format('HH:mm'),
});

export default id => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD_NEWSLETTER, id));

  return loadElement(apiPath, id).then(
    (data) => {
      const values = transformInputValues(data);
      dispatch(loadElementSucceeded(types.LOAD_NEWSLETTER_SUCCEEDED, id, values));

      return values;
    },
    (errors) => {
      dispatch(loadElementFailed(types.LOAD_NEWSLETTER_FAILED, id, errors));

      return errors;
    },
  );
};
