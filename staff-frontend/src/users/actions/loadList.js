import { updatePagination } from '../../pagination/actions';
import { LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL } from '../constants';
import { get } from '../../jq-redux-api/api';

const loadListStarted = () => ({
  type: LOAD_LIST,
});

const loadListSucceeded = data => (dispatch) => {
  dispatch(updatePagination('users', data.pagination));

  dispatch({
    type: LOAD_LIST_SUCCESS,
    ...data,
  });
};

const loadListFailed = ({ errors }) => ({
  type: LOAD_LIST_FAIL,
  errors,
});

export const loadList = queryParams => (dispatch) => {
  dispatch(loadListStarted());

  const { filter: rawFilter, ...params } = queryParams;
  const filter = {
    ...rawFilter,
    lastName: rawFilter.lastName ? `${rawFilter.lastName}*` : undefined,
  };

  return get('/v1/users/staff', { ...params, filter })
    .then((result) => {
      dispatch(loadListSucceeded(result));
    })
    .catch((result) => {
      dispatch(loadListFailed(result));
    });
};

export default { loadList };
