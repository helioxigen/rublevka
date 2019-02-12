import { makeDateRange, formatFilterDate } from 'core/helpers';

import { laneFilters } from 'cem/constants/requests/images/dictionaries';

export const mapFilter = (key, { dateFrom, dateTo, ...filter }) => ({
  ...(laneFilters[key] || {}),
  id: filter.id,
  kind: filter.kind,

  objectId: filter.objectId,
  createdAt: makeDateRange(
    formatFilterDate(dateFrom),
    formatFilterDate(dateTo),
  ),

  createdByUserId: filter.createdByUserId,
  responsibleUserId: filter.responsibleUserId,
});
