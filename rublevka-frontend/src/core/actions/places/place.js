import { API } from 'core/config/sources';
import {
  LOAD_PLACE,
  LOAD_PLACE_SUCCEEDED,
  LOAD_PLACE_FAILED,
} from '../../constants/places';
// import { loadSimilarPlaces } from './similar';

function loadStarted(kind, id) {
  return {
    type: LOAD_PLACE,
    id,
    kind,
  };
}

function loadSucceeded(kind, id, data) {
  const timestamp = new Date().getTime();

  return {
    type: LOAD_PLACE_SUCCEEDED,
    id,
    data,
    timestamp,
    kind,
  };
}

function loadFailed(kind, id, error) {
  return {
    type: LOAD_PLACE_FAILED,
    id,
    error,
    kind,
  };
}

export function loadPlace(kind, id) {
  return dispatch => {
    dispatch(loadStarted(kind, id));

    return API.get(`/v1/places/${kind}/${id}`).then(
      ({ body }) => dispatch(loadSucceeded(kind, id, body)),
      ({ body }) => dispatch(loadFailed(kind, id, body)),
    );
  };
}
