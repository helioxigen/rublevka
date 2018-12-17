import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

import loadDivisions from '../list/load';

export default function createDivision(data) {
  return dispatch =>
    API.post('/v1/divisions', data).then(
      () => Promise.resolve(dispatch(loadDivisions())),
      ({ body }) => {
        dispatch(pop('danger', 'Ошибка создания отдела!'));
        return body;
      },
    );
}
