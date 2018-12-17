import { API } from 'core/config/sources';

import { recursiveCleanUp } from 'cem/helpers';

import { updateResidential, createResidential } from '../residential';
import loadProperty from '../id/load';

import * as types from 'cem/constants/properties/actions';

import { pop } from 'cem/actions/toastr';
import { transformProperty } from '../helpers';

const createPropertyStarted = () => ({
  type: types.CREATE_PROPERTY,
});

const createPropertyFailed = errors => dispatch =>
  dispatch({
    type: types.CREATE_PROPERTY_FAIL,
    errors,
  });

function create(data, category) {
  return dispatch =>
    API.post(`/v1/properties/${category}`, transformProperty(data, category)).then(
      ({ body: { id } }) => dispatch(loadProperty(id)),
      ({ body }) => {
        dispatch(createPropertyFailed(body));
        return body;
      },
    );
}

export default function ({ location, residentialComplex, ...data }, category) {
  return (dispatch) => {
    dispatch(createPropertyStarted());

    if (Object.keys(recursiveCleanUp(residentialComplex || {})).length) {
      if (!data.residentialComplexId) {
        return dispatch(createResidential(residentialComplex, location)).then(({ id }) =>
          dispatch(create({ location, ...data, residentialComplexId: id }, category)),
        );
      }
      return dispatch(updateResidential(residentialComplex.id, residentialComplex, location)).then(
        () => dispatch(create({ location, ...data }, category)),
      );
    }
    return dispatch(create({ location, ...data }, category));
  };
}
