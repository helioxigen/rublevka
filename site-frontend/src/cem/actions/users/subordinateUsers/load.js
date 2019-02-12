import { API } from 'core/config/sources';
import * as types from 'cem/constants/users/actions';

import { updatePagination } from 'core/actions/pagination';

const loadSubordinateUsersStarted = id => ({
  type: types.LOAD_SUBORDINATE_USERS,
  id,
});

const loadSubordinateUsersSucceeded = (
  id,
  { pagination, items },
) => dispatch => {
  dispatch(updatePagination('users.subordinates', pagination));

  dispatch({
    type: types.LOAD_SUBORDINATE_USERS_SUCCESS,
    id,
    items,
  });
};

const loadSubordinateUsersFailed = (id, { errors }) => ({
  type: types.LOAD_SUBORDINATE_USERS_FAIL,
  id,
  errors,
});

export default function loadSubordinateUsers(id) {
  return (dispatch, getState) => {
    dispatch(loadSubordinateUsersStarted(id));

    const user = getState().users[id].data;

    const queryParams = {
      filter: {
        'details.departmentId': user.details ? user.details.departmentId : null,
        'details.divisionId': user.details ? user.details.divisionId : null,
      },
      filterNot: { id },
    };

    return API.get('/v1/users/staff', queryParams).then(
      ({ body }) => dispatch(loadSubordinateUsersSucceeded(id, body)),
      ({ body }) => dispatch(loadSubordinateUsersFailed(id, body)),
    );
  };
}
