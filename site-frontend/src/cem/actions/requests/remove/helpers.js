import { makeDateRange, formatFilterDate } from 'core/helpers';

import { laneFilters } from 'cem/constants/requests/remove/dictionaries';

export const mapFilter = (key, { dateFrom, dateTo, ...filter }) => ({
  ...filter,
  ...laneFilters[key],
  createdAt: makeDateRange(
    dateFrom && formatFilterDate(dateFrom),
    dateTo && formatFilterDate(dateTo),
  ),
});
