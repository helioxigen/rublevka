import { API } from 'core/config/sources';
import * as types from 'cem/constants/contacts';

import { mapFilters } from './helpers';
import { updatePagination } from 'core/actions/pagination';

// Load List
const loadContactsStarted = (queryParams, flat) => ({
  type: types.LOAD_LIST,
  queryParams,
  flat,
});

const loadContactsSucceeded = ({ items, pagination }, flat) => (dispatch) => {
  dispatch(updatePagination('contacts', pagination));

  return dispatch({
    type: types.LOAD_LIST_SUCCESS,
    items,
    flat,
  });
};

const loadContactsFailed = ({ errors }) => ({
  type: types.LOAD_LIST_FAIL,
  errors,
});

export function loadContacts(queryParams, flat = false) {
  return (dispatch) => {
    dispatch(loadContactsStarted(queryParams, flat));

    const filter = mapFilters(queryParams.filter);

    return API.get('/v1/contacts', { ...queryParams, filter }).then(
      ({ body }) => dispatch(loadContactsSucceeded(body, flat)),
      ({ body }) => dispatch(loadContactsFailed(body)),
    );
  };
}
// Load List End
