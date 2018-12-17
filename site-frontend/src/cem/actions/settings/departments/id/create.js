import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

import loadDepartments from '../list/load';

export default function createDepartment(data) {
  return dispatch =>
    API.post('/v1/departments', data).then(
      () => Promise.resolve(dispatch(loadDepartments())),
      ({ body }) => {
        dispatch(pop('danger', 'Ошибка создания департамента!'));
        return body;
      },
    );
}
