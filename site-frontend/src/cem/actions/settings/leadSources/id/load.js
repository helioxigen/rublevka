import { API } from 'core/config/sources';
import * as types from 'cem/constants/leadSources';

const loadLeadSourceSucceeded = (id, data) => ({
  type: types.LOAD_LEAD_SOURCE_SUCCESS,
  id,
  data,
});

const loadLeadSourceFailed = (id, { errors }) => ({
  type: types.LOAD_LEAD_SOURCE_FAIL,
  errors,
});

export default id => dispatch =>
  API.get(`/v1/client_lead_sources/${id}`).then(
    ({ body }) => dispatch(loadLeadSourceSucceeded(id, body)),
    ({ body }) => dispatch(loadLeadSourceFailed(id, body)),
  );
