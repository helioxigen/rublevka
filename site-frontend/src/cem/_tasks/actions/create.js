import { createElement, createElementStarted, createElementFailed, createElementSucceeded } from 'core/fetcher2/actions';

import * as types from 'cem/_tasks/constants/actions';
import { apiPath } from 'cem/_tasks/constants/defaults';

import { transformOutputValues } from 'cem/_tasks/helpers/transformOutputValues';

const create = values => (dispatch) => {
  dispatch(createElementStarted(types.CREATE, values));

  return createElement(apiPath, transformOutputValues(values))
    .then(
      (body) => {
        dispatch(createElementSucceeded(types.CREATE_SUCCEEDED, body));

        return body;
      }, ({ errors }) => {
        dispatch(createElementFailed(types.CREATE_FAILED, errors));

        return { errors };
      },
    );
};

export default create;
