import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

const loadContractsStarted = propertyId => ({
  type: types.LOAD_CONTRACTS,
  propertyId,
});

const loadContractsSucceeded = (propertyId, contracts) => ({
  type: types.LOAD_CONTRACTS_SUCCESS,
  propertyId,
  ...contracts,
});

const loadContractsFailed = (propertyId, errors) => ({
  type: types.LOAD_CONTRACTS_FAIL,
  propertyId,
  errors,
});

export default function (propertyId, category = 'city') {
  return (dispatch) => {
    dispatch(loadContractsStarted(propertyId));

    return API.get(`/v1/properties/${category}/${propertyId}/contracts`).then(
      ({ body }) => dispatch(loadContractsSucceeded(propertyId, body)),
      ({ body }) => dispatch(loadContractsFailed(propertyId, body)),
    );
  };
}
