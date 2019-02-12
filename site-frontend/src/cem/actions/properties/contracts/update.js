import { API } from 'core/config/sources';
import { transformContract } from '../helpers';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/properties/actions';

import loadContracts from './load';

const updateContractStarted = (id, propertyId) => ({
  type: types.UPDATE_CONTRACT,
  id,
  propertyId,
});

const updateContractFailed = (id, propertyId, errors) => ({
  type: types.UPDATE_CONTRACT_FAIL,
  id,
  propertyId,
  errors,
});

export default function(propertyId, id, data, category = 'city') {
  return dispatch => {
    dispatch(updateContractStarted());

    return API.put(
      `/v1/properties/${category}/${propertyId}/contracts/${id}`,
      transformContract(data),
    ).then(
      () => {
        dispatch(pop('success', 'Контракты обновлены'));
        return dispatch(loadContracts(propertyId));
      },
      ({ body }) => {
        dispatch(updateContractFailed(body));
        return body;
      },
    );
  };
}
