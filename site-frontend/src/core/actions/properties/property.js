import { API } from 'core/config/sources';

import { LOAD_PROPERTY, LOAD_PROPERTY_SUCCEEDED, LOAD_PROPERTY_FAILED } from '../../constants/properties';
import loadComplex from 'core/actions/complexes/id/load';

// import { loadSimilarProperties } from './similar';

function loadStarted(id) {
  return {
    type: LOAD_PROPERTY,
    id,
  };
}

const loadSucceeded = (id, data) => (dispatch) => {
  const succeededAction = {
    type: LOAD_PROPERTY_SUCCEEDED,
    id,
    data,
    timestamp: new Date().getTime(),
  };

  if (data.complexBuildingId) {
    return dispatch(loadComplex(data.complexBuildingId)).then(dispatch(succeededAction));
  }
  return dispatch(succeededAction);
};

function loadFailed(id, error) {
  return {
    type: LOAD_PROPERTY_FAILED,
    id,
    error,
  };
}

// TODO Substitute 'kind' for 'category' according to new API
function loadProperty(category, id) {
  return (dispatch) => {
    dispatch(loadStarted(id));
    // dispatch(loadSimilarProperties(category, id, dealType));

    return API.get(`/v1/properties/${category}/${id}`).then(
      ({ body }) => dispatch(loadSucceeded(id, body)),
      ({ body }) => dispatch(loadFailed(id, body)),
    );
  };
}

export { loadProperty };
