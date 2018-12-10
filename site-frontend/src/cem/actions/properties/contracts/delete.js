import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

import loadContracts from './load';

const unlinkContractStarted = (propertyId, id) => ({
  type: types.UNLINK_CONTRACT,
  propertyId,
  id,
});

const unlinkContractFailed = (propertyId, id, errors) => ({
  type: types.UNLINK_CONTRACT_FAIL,
  errors,
  propertyId,
  id,
});

export default function (propertyId, id, category = 'city') {
  return (dispatch) => {
    dispatch(unlinkContractStarted(propertyId, id));

    return API.del(`/v1/properties/${category}/${propertyId}/contracts/${id}`).then(
      () => dispatch(loadContracts(propertyId)),
      ({ body }) => {
        dispatch(unlinkContractFailed(propertyId, id, body));
        return body;
      },
    );
  };
}
