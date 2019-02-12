import { API } from 'core/config/sources';
import { updatePagination } from 'core/actions/pagination';

import * as types from 'cem/constants/properties/actions';

const loadPropertyEventsStarted = (id, eventKind) => ({
  type: types.LOAD_EVENTS,
  id,
  eventKind,
});

const loadPropertyEventsFailed = (id, eventKind, { errors }) => ({
  type: types.LOAD_EVENTS_FAIL,
  id,
  eventKind,
  errors,
});

const loadPropertyEventsSucceeded = (
  id,
  eventKind,
  { items, pagination },
) => dispatch => {
  dispatch(updatePagination('propertiesEvents', pagination));

  return dispatch({
    type: types.LOAD_EVENTS_SUCCESS,
    id,
    eventKind,
    pagination,
    items,
  });
};

export default (
  category,
  id,
  eventKind = 'property_pdf_export',
  queryParams = { filter: {}, pagination: {} },
) => dispatch => {
  dispatch(loadPropertyEventsStarted(id, eventKind));
  const query = {
    ...queryParams,
    filter: { ...queryParams.filter, 'details.kind': eventKind },
    pagination: queryParams.pagination,
  };

  return API.get(`/v1/properties/${category}/${id}/events`, query).then(
    ({ body }) => dispatch(loadPropertyEventsSucceeded(id, eventKind, body)),
    ({ body }) => dispatch(loadPropertyEventsFailed(id, eventKind, body)),
  );
};
