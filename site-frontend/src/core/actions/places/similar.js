import { API } from 'core/config/sources';
import {
  LOAD_SIMILAR_PLACES,
  LOAD_SIMILAR_PLACES_SUCCEEDED,
  LOAD_SIMILAR_PLACES_FAILED,
} from '../../constants/places';

function loadSimilarStarted(id) {
  return {
    type: LOAD_SIMILAR_PLACES,
    id,
  };
}

function loadSimilarSucceeded(id, data) {
  return {
    type: LOAD_SIMILAR_PLACES_SUCCEEDED,
    id,
    data,
  };
}

function loadSimilarFailed(id, error) {
  return {
    type: LOAD_SIMILAR_PLACES_FAILED,
    id,
    error,
  };
}

export function loadSimilarPlaces(kind, id) {
  return (dispatch) => {
    dispatch(loadSimilarStarted(id));

    return API.get(`/v1/places/${kind}/${id}/similar`).then(
      ({ body }) => dispatch(loadSimilarSucceeded(id, body)),
      ({ body }) => dispatch(loadSimilarFailed(id, body)),
    );
  };
}
