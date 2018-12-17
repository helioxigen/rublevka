import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

import loadPositions from '../list/load';

export default function createPosition(data) {
  return dispatch =>
    API.post('/v1/roles', data).then(
      () => Promise.resolve(dispatch(loadPositions())),
      ({ body }) => {
        dispatch(pop('danger', 'Ошибка создания роли!'));
        return body;
      },
    );
}
