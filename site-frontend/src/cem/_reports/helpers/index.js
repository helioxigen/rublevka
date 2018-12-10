import { makeDateRange, formatDateToDay } from 'core/helpers';

export const mapParams = ({ pagination = {}, orderBy = {}, filter = {}, filterNot = {} }) => {
  const { limit, offset } = pagination;

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy: {
      [orderBy.field]: orderBy.predicate,
    },
    filter: {
      'marketing.utms.medium': filter.medium,
      'marketing.utms.source': filter.source,
      'marketing.utms.campaign': filter.campaign,
      'marketing.utms.content': filter.content,
      'marketing.utms.term': filter.term,
      departmentId: filter.departmentId,
      divisionId: filter.divisionId,
      staffUserId: filter.staffUserId,

      createdAt: makeDateRange(formatDateToDay(filter.createdAtFrom), formatDateToDay(filter.createdAtTo)),
    },
  };
};
