import uniq from 'lodash/uniq';
import { makeDateRange, formatFilterDate } from 'core/helpers';

export const mapParams = ({ pagination = {}, orderBy = {}, filter = {}, filterNot = {} }) => {
  const { limit, offset } = pagination;
  const {
    id,
    kind,
    linkKind,
    state,
    deadlineFrom,
    deadlineTo,
    ruDepartmentId,
    ruDivisionId,
    ruId,
    toApprove,
  } = filter;

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy,
    filter: {
      id,
      kind,
      state,
      deadline: makeDateRange(formatFilterDate(deadlineFrom), formatFilterDate(deadlineTo)),
      'details.linkKind': linkKind,
      'details.contactId': filter.contactId,
      'details.clientLeadId': filter.clientLeadId,
      'details.dealId': filter.dealId,
      'details.propertyId': filter.propertyId,
      'responsibleUser.departmentId': ruDepartmentId,
      'responsibleUser.divisionId': ruDivisionId,
      'responsibleUser.id': ruId,
      'stateDetails.toApprove': toApprove ? 'done,canceled' : null,
    },
    filterNot,
  };
};

export const getKeysFromDetails = (key, tasks) => {
  const items = tasks
    .map((task) => {
      const details =
        task.previewDetails || task.negotiationDetails || task.contactDetails || task.freeDetails;

      if (details[key]) return details[key];
    })
    .filter(id => !!id); // remove undefined

  return uniq(items);
};

export const getDetails = task =>
  task._details ||
  task.contactDetails ||
  task.freeDetails ||
  task.previewDetails ||
  task.negotiationDetails || {};

export const getLinkKind = (task) => {
  const linkKind = getDetails(task).linkKind; // NOTE negotiation doesn't have linkKind, because it can be only with deal

  const isPreviewByDeal = task.kind === 'preview' && getDetails(task).dealId;
  const isPreviewByClientLead = task.kind === 'preview' && getDetails(task).clientLeadId;

  if (isPreviewByDeal) return 'deal';
  if (isPreviewByClientLead) return 'client_lead';

  return linkKind;
};
