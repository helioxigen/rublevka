import { createElement, createElementStarted, createElementFailed, createElementSucceeded } from 'core/fetcher2/actions';

import * as types from 'site/request/constants/actions';
import { apiPath } from 'site/request/constants/defaults';

const createClientLead = data => (dispatch) => {
  dispatch(createElementStarted(types.CREATE));

  return createElement(`${apiPath}?departmentId=3`, data)
    .then(
      ({ id }) => {
        dispatch(createElementSucceeded(types.CREATE_SUCCEEDED, id));

        return { id };
      }, (errors) => {
        dispatch(createElementFailed(types.CREATE_FAILED, errors));
        return { errors };
      },
    );
};

export { createClientLead };
