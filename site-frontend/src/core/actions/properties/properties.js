import { API } from 'core/config/sources';

import { LOAD_PROPERTIES, LOAD_PROPERTIES_SUCCEEDED, LOAD_PROPERTIES_FAILED } from '../../constants/properties';

import { makeFilter, makeFilterNot, makeRoomsFilterAndFilterNot } from 'core/utils/properties';

import loadList from 'core/_countryProperties/actions/list/load';

function loadStarted(kind, params) {
  return {
    type: LOAD_PROPERTIES,
    kind,
    params,
  };
}

const loadSucceeded = (kind, response) => ({
  type: LOAD_PROPERTIES_SUCCEEDED,
  ...response,
  kind,
  timestamp: new Date().getTime(),
});

function loadFailed(kind, error) {
  return {
    type: LOAD_PROPERTIES_FAILED,
    kind,
    error,
  };
}

function loadProperties(kind, { pagination: paginationParams = {}, ...params } = {}) {
  return (dispatch) => {
    if (kind === 'country') {
      const options = {
        pagination: paginationParams,
        filter: params.filter,
      };

      dispatch(loadList(options, 'sale'));
    }

    const query = {
      ...params,
      filter: {
        ...makeFilter(params.filter),
        ...makeRoomsFilterAndFilterNot(params.filter['specification.rooms']).filter,
      },
      filterNot: {
        ...makeFilterNot(params.filterNot),
        ...makeRoomsFilterAndFilterNot(params.filter['specification.rooms']).filterNot,
      },
      pagination: {
        offset: paginationParams.offset,
        limit: paginationParams.limit,
      },
    };

    dispatch(loadStarted(kind, query));

    return API.get(`/v1/properties/${kind}`, query).then(
      ({ body }) => dispatch(loadSucceeded(kind, body)),
      ({ body }) => dispatch(loadFailed(kind, body)),
    );
  };
}

export { loadProperties };
