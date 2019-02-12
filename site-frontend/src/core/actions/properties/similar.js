import { API } from 'core/config/sources';
import {
  LOAD_SIMILAR_PROPERTIES,
  LOAD_SIMILAR_PROPERTIES_SUCCEEDED,
  LOAD_SIMILAR_PROPERTIES_FAILED,
} from '../../constants/properties';

function loadSimilarStarted(id) {
  return {
    type: LOAD_SIMILAR_PROPERTIES,
    id,
  };
}

function loadSimilarSucceeded(id, data) {
  return {
    type: LOAD_SIMILAR_PROPERTIES_SUCCEEDED,
    id,
    data,
  };
}

function loadSimilarFailed(id, error) {
  return {
    type: LOAD_SIMILAR_PROPERTIES_FAILED,
    id,
    error,
  };
}

export function loadSimilarProperties(kind, id, dealType) {
  return dispatch => {
    dispatch(loadSimilarStarted(id));

    return API.get(`/v1/properties/${kind}/${id}/similar/${dealType}`).then(
      ({ body }) => dispatch(loadSimilarSucceeded(id, body)),
      ({ body }) => dispatch(loadSimilarFailed(id, body)),
    );
  };
}
