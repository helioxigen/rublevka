import moment from 'moment';

import { dateAndTimeToIso8601 } from 'core/helpers';

export function prepareInitialValues(data) {
  if (!data) {
    return {
      departmentId: 1,
      utcOffset: moment().utcOffset(),
    };
  }

  return {
    id: data.id,
    departmentId: data.departmentId,
    staffUserId: data.staffUserId,
    startDate: data.startAt,
    finishDate: data.finishAt,
    startTime: moment(data.startAt).format('HH:mm'),
    finishTime: moment(data.finishAt).format('HH:mm'),
    utcOffset: moment(data.startAt).utcOffset(),
  };
}

export function prepareFormValuesForSubmit(values) {
  const {
    startDate,
    finishDate,
    startTime,
    finishTime,
    utcOffset,
    departmentId,
    ...restValues
  } = values; // eslint-disable-line no-unused-vars

  return {
    ...restValues,
    startAt: dateAndTimeToIso8601(startDate, startTime, utcOffset),
    finishAt: dateAndTimeToIso8601(finishDate, finishTime, utcOffset),
  };
}
