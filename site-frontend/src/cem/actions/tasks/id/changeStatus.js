import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

export default function changeStatus(id, status) {
  return dispatch => API.post(`/v1/tasks/${id}/${status}`).then(
      () => Promise.resolve(dispatch(pop('success', 'Статус задачи изменён!'))),
      () => dispatch(pop('error', 'Ошибка изменения статуса задачи!')),
    );
}
