import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import { loadUser } from './load';

import { transform } from './helpers';

const updateUserSucceeded = id => dispatch => {
  dispatch(pop('success', 'Изменения сохранены'));
  return dispatch(loadUser(id));
};

const updateUser = ({ id, ...data }) => dispatch =>
  API.put(`/v1/users/staff/${id}`, transform(data)).then(
    () => dispatch(updateUserSucceeded(id)),
    ({ body }) => {
      dispatch(pop('error', 'Возникли ошибки'));
      return body;
    },
  );

export default updateUser;
