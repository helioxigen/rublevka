import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import { transformSettlementOut, transformSettlementIn } from '../helpers';

const createSettlementStarted = settlement => ({
  type: types.CREATE_SETTLEMENT,
  settlement,
});

const createSettlementSucceeded = (id, data) => dispatch => {
  dispatch({
    type: types.CREATE_SETTLEMENT_SUCCESS,
    id,
    data,
  });

  dispatch(pop('success', `Посёлок (ID: ${id})`, 'Успешно создан'));
  return dispatch(pushPath(`/places/settlements/${id}`));
};

const createSettlementFailed = ({ errors }) => ({
  type: types.CREATE_SETTLEMENT_FAIL,
  errors,
});

export default function createSettlement(settlement) {
  return dispatch => {
    dispatch(createSettlementStarted(settlement));

    return API.post(
      '/v1/places/settlements',
      transformSettlementOut({ ...settlement, state: 'draft' }),
    ).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body }) =>
          dispatch(
            createSettlementSucceeded(body.id, transformSettlementIn(body)),
          ),
        ),
      ({ body }) => {
        dispatch(createSettlementFailed(body));
        return body;
      },
    );
  };
}
