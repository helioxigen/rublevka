import { API } from 'core/config/sources';
import { transformResidential } from '../helpers';

import loadResidential from './load';

import * as types from 'cem/constants/properties/actions';

const updateResidentialStarted = id => ({
  type: types.UPDATE_RESIDENTIAL,
  id,
});

const updateResidentialFailed = errors => ({
  type: types.UPDATE_RESIDENTIAL_FAIL,
  errors,
});

export default function (id, data, location) {
  return (dispatch) => {
    dispatch(updateResidentialStarted(id));

    const complex = {
      ...data,
      images: [],
      location,
    };

    return API.put(`/v1/complexes/${id}`, transformResidential(complex)).then(
      () => dispatch(loadResidential(id)),
      ({ body }) => {
        dispatch(updateResidentialFailed(body));
        return body;
      },
    );
  };
}
