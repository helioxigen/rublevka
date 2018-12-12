import { API } from 'core/config/sources';
import * as types from 'cem/constants/users/actions';

import { updatePagination } from 'core/actions/pagination';

const loadListStarted = () => ({
  type: types.LOAD_LIST,
});

const loadListSucceeded = data => (dispatch) => {
  dispatch(updatePagination('users', data.pagination));

  dispatch({
    type: types.LOAD_LIST_SUCCESS,
    ...data,
  });
};

const loadListFailed = ({ errors }) => ({
  type: types.LOAD_LIST_FAIL,
  errors,
});

function loadList(queryParams) {
  return (dispatch) => {
    dispatch(loadListStarted());

    const { filter: rawFilter, ...params } = queryParams;
    const filter = {
      ...rawFilter,
      lastName: rawFilter.lastName ? `${rawFilter.lastName}*` : undefined,
    };

    return API.get('/v1/users/staff', { ...params, filter }).then(
      ({ body }) => dispatch(loadListSucceeded(body)),
      ({ body }) => dispatch(loadListFailed(body)),
    );
  };
}

export default { loadList };
