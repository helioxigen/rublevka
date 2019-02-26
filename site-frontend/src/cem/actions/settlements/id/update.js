import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import { transformSettlementOut } from '../helpers';
import loadSettlement from './load';

const updateSettlementStarted = (id, settlement) => ({
  type: types.UPDATE_SETTLEMENT,
  id,
  settlement,
});

const updateSettlementFailed = (id, { errors }) => ({
  type: types.UPDATE_SETTLEMENT_FAIL,
  id,
  errors,
});

export default function updateSettlement(id, settlement) {
  return dispatch => {
    dispatch(updateSettlementStarted(id, settlement));

    return API.put(
      `/v1/places/settlements/${id}`,
      transformSettlementOut(settlement),
    ).then(
      () =>
        dispatch(pop('success', `Посёлок (ID: ${id})`, 'Успешно обновлён')) &&
        dispatch(loadSettlement(id)),
      ({ body }) => {
        dispatch(
          pop(
            'error',
            `Посёлок (ID: ${id})`,
            'При обновлении посёлка что-то пошло не так',
          ),
        );
        dispatch(updateSettlementFailed(id, body));
        return body;
      },
    );
  };
}
