import { API } from 'core/config/sources';
import { pop } from 'cem/actions/toastr';
import { recursiveCleanUp } from 'cem/helpers';

import loadProperty from './load';

import { transformProperty } from '../helpers';
import { createResidential, updateResidential } from '../residential';

import * as types from 'cem/constants/properties/actions';

const updatePropertyStarted = id => ({
  type: types.UPDATE_PROPERTY,
  id,
});

const updatePropertyFailed = id => dispatch => {
  dispatch(pop('error', 'Ошибка сохранения'));

  return dispatch({
    type: types.UPDATE_PROPERTY_FAIL,
    id,
  });
};

function update(id, data, category) {
  return dispatch =>
    API.put(
      `/v1/properties/${category}/${id}`,
      transformProperty(data, category),
    ).then(
      () => dispatch(loadProperty(id)),
      ({ body }) => {
        dispatch(updatePropertyFailed(id));
        return body;
      },
    );
}

export default function(
  propertyId,
  { residentialComplex, location, ...data },
  category,
) {
  return dispatch => {
    dispatch(updatePropertyStarted(propertyId));

    if (!data.residentialComplexId) {
      if (Object.keys(recursiveCleanUp(residentialComplex || {})).length) {
        return dispatch(createResidential(residentialComplex, location)).then(
          ({ id }) =>
            dispatch(
              update(
                propertyId,
                { ...data, location, residentialComplexId: id },
                category,
              ),
            ),
        );
      }
      return dispatch(update(propertyId, { ...data, location }, category));
    } else if (residentialComplex) {
      return dispatch(
        updateResidential(residentialComplex.id, residentialComplex, location),
      ).then(() =>
        dispatch(update(propertyId, { ...data, location }, category)),
      );
    }
    return dispatch(update(propertyId, { ...data, location }, category));
  };
}
