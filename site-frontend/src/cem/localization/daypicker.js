const WEEKDAYS_LONG = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
};

const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};

const MONTHS = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  ru: [
    'Январь',
    'Ферваль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентрябь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
};

const localeCustomUtils = {
  formatMonthTitle: (day, locale) => `${MONTHS[locale][day.getMonth()]} ${day.getFullYear()}`,
  formatWeekdayShort: (index, locale) => WEEKDAYS_SHORT[locale][index],
  formatWeekdayLong: (index, locale) => WEEKDAYS_LONG[locale][index],
  // BUG: A bug in react-day-picker causes incorect weekdays header ordering while
  // Dates in calendar are ordered correctly, disabled this feature untill it's fixed.
  // Also you HAVE to have this method if you provide a custom localeUtils.
  getFirstDayOfWeek: locale => (locale === 'ru' ? 1 : 0),
};

export default localeCustomUtils;
