import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { transformSettlementIn } from '../helpers';

const loadSettlementStarted = id => ({
  type: types.LOAD_SETTLEMENT,
  id,
});

const loadSettlementSucceeded = (id, data) => ({
  type: types.LOAD_SETTLEMENT_SUCCESS,
  id,
  data,
});

const loadSettlementFailed = ({ errors }) => ({
  type: types.LOAD_SETTLEMENT_FAIL,
  errors,
});

export default function loadSettlement(id) {
  return dispatch => {
    dispatch(loadSettlementStarted(id));

    return API.get(`/v1/places/settlements/${id}`).then(
      ({ body }) =>
        dispatch(loadSettlementSucceeded(id, transformSettlementIn(body))),
      ({ body }) => dispatch(loadSettlementFailed(body)),
    );
  };
}
