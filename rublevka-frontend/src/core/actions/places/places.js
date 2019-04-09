import { API } from 'core/config/sources';
import {
  LOAD_PLACES,
  LOAD_PLACES_SUCCEEDED,
  LOAD_PLACES_FAILED,
} from '../../constants/places';
import { makeFilter } from 'core/utils/places';

function loadStarted(kind, params) {
  return {
    type: LOAD_PLACES,
    kind,
    params,
  };
}

function loadSucceeded(kind, response) {
  const timestamp = new Date().getTime();

  return {
    type: LOAD_PLACES_SUCCEEDED,
    ...response,
    kind,
    timestamp,
  };
}

function loadFailed(kind, error) {
  return {
    type: LOAD_PLACES_FAILED,
    kind,
    error,
  };
}

export function loadPlaces(kind, params) {
  return dispatch => {
    const filter = makeFilter(params);

    dispatch(loadStarted(kind, params));

    return API.get(`/v1/places/${kind}`, { ...params, filter }).then(
      ({ body }) => dispatch(loadSucceeded(kind, body)),
      ({ body }) => dispatch(loadFailed(kind, body)),
    );
  };
}
