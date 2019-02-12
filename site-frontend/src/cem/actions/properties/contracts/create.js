import { API } from 'core/config/sources';
import { uploadFile } from '../helpers';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/properties/actions';

import updateContract from './update';

const linkContractStarted = propertyId => ({
  type: types.LINK_CONTRACT,
  propertyId,
});

const linkContractFailed = (propertyId, errors) => ({
  type: types.LINK_CONTRACT_FAIL,
  propertyId,
  errors,
});

export default function(propertyId, { file, ...data }, category = 'city') {
  return dispatch => {
    dispatch(linkContractStarted(propertyId));
    dispatch(pop('success', 'Загрузка контракта начата'));

    return uploadFile(propertyId, file, category, 'contracts').then(
      location =>
        API.get(location).then(({ body }) =>
          dispatch(updateContract(propertyId, body.id, data)),
        ),
      ({ body }) => {
        dispatch(linkContractFailed(propertyId, body));
        return body;
      },
    );
  };
}
