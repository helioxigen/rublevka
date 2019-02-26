import moment from 'moment';
import { getDetails, getLinkKind } from 'cem/_tasks/helpers';

const roundMomentTime = momentTime =>
  momentTime.add((10 - momentTime.minute()) % 10, 'minutes');

export const transformInputValues = values => {
  const {
    goal,
    goalId,
    contactId,
    clientLeadId,
    dealId,
    objects,
    propertyId,
    propertyCategory,
    archivedDocumentId,
    confirmation,
    confirmationAt,
  } = getDetails(values);

  return {
    id: values.id,
    kind: values.kind,
    state: values.state,
    result: values.result,
    resultId: values.resultId,
    responsibleUser: values.responsibleUser,
    reportedByUserId: values.reportedByUserId,

    deadline: values.deadline,

    stateDetails: values.stateDetails,

    confirmation: values.confirmation,
    confirmationAt: values.confirmationAt,

    _deadline: {
      date: values.deadline,
      time: roundMomentTime(moment(values.deadline)).format('HH:mm'),
      utcOffset: moment(values.deadline).utcOffset(),
    },

    _details: {
      linkKind: getLinkKind(values),
      goal,
      goalId,

      contactId,
      clientLeadId,
      dealId,

      objects,

      propertyId,
      propertyCategory,

      archivedDocumentId,
      confirmation,
      confirmationAt,
    },
  };
};

export default transformInputValues;
