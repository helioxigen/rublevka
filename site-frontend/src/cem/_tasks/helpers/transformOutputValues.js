import { dateAndTimeToIso8601 } from 'core/helpers';

const transformDetails = (kind, details) => {
  const isKindContact = kind === 'sms' || kind === 'email' || kind === 'call' || kind === 'meeting';
  const isKindFree = kind === 'free';
  const isKindPreview = kind === 'preview';
  // const isKindNegotiation = kind === `negotiation`;

  if (isKindContact) {
    return {
      contactDetails: {
        linkKind: details.linkKind,
        goalId: details.goalId,

        contactId: details.contactId,
        clientLeadId: details.clientLeadId,
        dealId: details.dealId,
      },
    };
  }

  if (isKindFree) {
    return {
      freeDetails: {
        linkKind: details.linkKind,
        goal: details.goal,

        contactId: details.contactId,
        clientLeadId: details.clientLeadId,
        dealId: details.dealId,
      },
    };
  }

  if (isKindPreview) {
    return {
      previewDetails: {
        linkKind: details.linkKind,
        objects: details.objects,

        contactId: details.contactId,
        dealId: details.dealId,
        clientLeadId: details.clientLeadId,
      },
    };
  }
  // if (isKindNegotiation) {
  //   return {
  //     negotiationDetails: {},
  //   };
  // }
};

export const transformOutputValues = (values) => {
  const { responsibleUser = {} } = values;
  const details = transformDetails(values.kind, values._details);

  return {
    id: values.id,
    kind: values.kind,
    state: values.state,
    result: values.result,
    resultId: values.resultId,
    responsibleUser: {
      ...responsibleUser,
      id: responsibleUser.id || parseInt(values.responsibleUserId, 0),
    },

    deadline: dateAndTimeToIso8601(
      values._deadline.date,
      values._deadline.time,
      values._deadline.utcOffset,
    ),
    ...details,
  };
};

export default transformOutputValues;
