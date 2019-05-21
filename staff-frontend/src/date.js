import fnsformat from 'date-fns/format';
import getTime from 'date-fns/get_time';
import ruLocale from 'date-fns/locale/ru';
import { differenceInHours, distanceInWords } from 'date-fns';

const defaultOptions = { locale: ruLocale };

export function format(date, formatParam, options) {
  return fnsformat(date, formatParam, { ...defaultOptions, ...options });
}

export function defaultFormat(date) {
  const now = new Date();
  const diff = differenceInHours(now, date);

  if (diff < 24) {
    const distance = distanceInWords(date, now, defaultOptions);
    return `${distance} назад`;
  }

  if (diff < 48) {
    return format(date, 'Вчера в hh:mm');
  }

  return format(date, 'DD MMMM YYYY года');
}

export function getDayStartTs(date) {
  return getTime(new Date(date.getFullYear(), date.getMonth(), date.getDay()));
}

export function compareDays(dateA, dateB) {
  return getDayStartTs(dateA) === getDayStartTs(dateB);
}

export function getTsMs() {
  return getTime(new Date());
}
