import moment from 'moment';

import { dateAndTimeToIso8601, formatFilterDate, makeDateRange } from 'core/helpers';

const roundMomentTime = momentTime => momentTime.add((10 - momentTime.minute()) % 10, 'minutes');

const getContactDetailsParams = ({ propertyId, propertyCategory, clientLeadId, dealId, contactId }) => {
  if (propertyId && propertyCategory) {
    return {
      propertyId: propertyId && parseInt(propertyId, 10),
      propertyCategory,
      linkKind: 'property',
    };
  }

  if (clientLeadId) {
    return {
      clientLeadId: clientLeadId && parseInt(clientLeadId, 10),
      linkKind: 'client_lead',
    };
  }

  if (dealId) {
    return {
      dealId: dealId && parseInt(dealId, 10),
      contactId: contactId && parseInt(contactId, 10),
      linkKind: 'deal',
    };
  }

  return {};
};

const getPreviewDetailsParams = ({ propertyId, dealId, contactId }) => ({
  propertyId: propertyId && parseInt(propertyId, 10),
  dealId: dealId && parseInt(dealId, 10),
  contactId: contactId && parseInt(contactId, 10),
});

const getNegotiationDetailsParams = ({ propertyId, dealId, contactId }) => ({
  propertyId: propertyId && parseInt(propertyId, 10),
  dealId: dealId && parseInt(dealId, 10),
  contactId: contactId && parseInt(contactId, 10),
});

export const prepareInitialValues = (id, { data, currentUserId, queryParams }) => {
  if (id === 'create') {
    const commonValues = {
      responsibleUser: {
        id: currentUserId,
      },
      deadline: {
        utcOffset: moment().utcOffset(),
      },
    };

    return {
      ...commonValues,
      contactDetails: getContactDetailsParams(queryParams),
      previewDetails: getPreviewDetailsParams(queryParams),
      negotiationDetails: getNegotiationDetailsParams(queryParams),
      freeDetails: getContactDetailsParams(queryParams),
    };
  }

  return {
    ...data,
    deadline: {
      date: data.deadline,
      time: roundMomentTime(moment(data.deadline)).format('HH:mm'),
      utcOffset: moment(data.deadline).utcOffset(),
    },
  };
};

export const prepareFormValuesForSubmit = ({ deadline, contactDetails, previewDetails, freeDetails, negotiationDetails, ...otherValues }) => ({
  ...otherValues,
  freeDetails: otherValues.kind === 'free' ? freeDetails : undefined,
  previewDetails: otherValues.kind === 'preview' ? previewDetails : undefined,
  negotiationDetails: otherValues.kind === 'negotiation' ? negotiationDetails : undefined,
  contactDetails: otherValues.kind !== 'free' && otherValues.kind !== 'preview' && otherValues.kind !== 'negotiation' ? contactDetails : undefined,
  deadline: dateAndTimeToIso8601(deadline.date, deadline.time, deadline.utcOffset),
});

export const filterTransform = (filter = {}) => {
  const { deadlineFrom, deadlineTo, ...params } = filter;

  return {
    ...params,
    deadline: makeDateRange(formatFilterDate(deadlineFrom), formatFilterDate(deadlineTo)),
  };
};

export const mapListFilter = (filter = {}, kind) => {
  const filters = {
    today: {
      state: 'to_do',
      deadline: `${moment(new Date()).hour(0).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z..${moment(new Date()).hour(23).minute(59).second(59).millisecond(999).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
    },
    overdue: {
      state: 'to_do',
      deadline: `..${moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
    },
    tomorrow: {
      state: 'to_do',
      deadline: `${moment(new Date()).add(1, 'day').hour(0).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z..${moment(new Date()).add(1, 'day').hour(23).minute(59).second(59).millisecond(999).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
    },
  };

  return filters[kind];
};
