import * as types from 'cem/constants/leads/actions';
import { updatePagination } from 'core/actions/pagination';
import { API } from 'core/config/sources';
import { mapFilterAndFilterNot } from '../helpers';

const loadLeadsStarted = () => ({
  type: types.LOAD_LEADS,
});

const loadLeadsSucceeded = (group, { items, pagination }) => dispatch => {
  dispatch(updatePagination(`leads.${group}`, pagination));

  return dispatch({
    type: types.LOAD_LEADS_SUCCESS,
    items,
  });
};

const loadLeadsFailed = ({ errors }) => ({
  type: types.LOAD_LEADS_FAIL,
  errors,
});

export default (group, params = {}) => dispatch => {
  dispatch(loadLeadsStarted());

  const query = {
    ...params,
    ...mapFilterAndFilterNot(params.filter, params.filterNot),
  };

  return API.get('/v1/client_leads', query).then(
    ({ body }) => dispatch(loadLeadsSucceeded(group, body)),
    ({ body }) => dispatch(loadLeadsFailed(body)),
  );
};
