import {
  updateElement,
  updateElementStarted,
  updateElementFailed,
  updateElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_tasks/constants/actions';
import { apiPath } from 'cem/_tasks/constants/defaults';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import transformOutputValues from 'cem/_tasks/helpers/transformOutputValues';
import transformInputValues from 'cem/_tasks/helpers/transformInputValues';

const update = (id: number | string, values) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(updateElementStarted(types.UPDATE, id));

    return updateElement(
      apiPath,
      id,
      recursiveCleanUp(transformOutputValues(values)),
    ).then(
      response => {
        dispatch(
          updateElementSucceeded(
            types.UPDATE_SUCCEEDED,
            id,
            transformInputValues(response),
          ),
        );

        return resolve(transformInputValues(response));
      },
      response => {
        dispatch(updateElementFailed(types.UPDATE_FAILED, id, response));

        return reject(response);
      },
    );
  });

export default update;
