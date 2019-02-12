import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

import { mapFilter } from '../helpers';

const loadSettlementsStarted = params => ({
  type: types.LOAD_SETTLEMENTS,
  params,
});

const loadSettlementsSucceeded = ({ items, pagination }) => dispatch => {
  dispatch(updatePagination('settlements', pagination));

  dispatch({
    type: types.LOAD_SETTLEMENTS_SUCCESS,
    items,
  });
};

const loadSettlementsFailed = ({ errors }) => ({
  type: types.LOAD_SETTLEMENTS_FAIL,
  errors,
});

export default function loadSettlements(queryParams = {}) {
  return dispatch => {
    dispatch(loadSettlementsStarted(queryParams));

    const filter = mapFilter(queryParams.filter);

    return API.get('/v1/places/settlements', { ...queryParams, filter }).then(
      ({ body }) => dispatch(loadSettlementsSucceeded(body)),
      ({ body }) => dispatch(loadSettlementsFailed(body)),
    );
  };
}
