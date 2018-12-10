import { makeDateRange, formatFilterDate } from 'core/helpers';

export const mapParams = ({ filter = {}, filterNot = {} }) => {
  const { createdAtFrom, createdAtTo, awaitingApproval, notAwaitingApproval, ...restFilter } = filter;

  const tasksWeightZeroDeadline = filter['tasksWeight.zero.deadline'];
  const phoneNumber = filter['contactDetails.phoneNumber'];

  return {
    filter: {
      ...restFilter,
      createdAt: makeDateRange(createdAtFrom && formatFilterDate(createdAtFrom), createdAtTo && formatFilterDate(createdAtTo)),
      'tasksWeight.zero.deadline': tasksWeightZeroDeadline ? formatFilterDate(tasksWeightZeroDeadline) : undefined,
      ...(phoneNumber ? { 'contactDetails.phoneNumber': `*${phoneNumber}*` } : {}),
      ...(awaitingApproval ? { 'stateDetails.toApprove': 'spam,processed,rejected' } : {}),
    },
    filterNot: {
      ...filterNot,
      ...(notAwaitingApproval ? { 'stateDetails.toApprove': 'spam,processed,rejected' } : {}),
    },
  };
};
