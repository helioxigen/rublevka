import moment from 'moment';
import get from 'lodash/get';

export const makeFilterRange = (min, max, multiplier = 1) => {
  const isMin =
    min === 'min' || typeof min === 'undefined' || typeof min === 'null';
  const isMax =
    max === 'max' || typeof max === 'undefined' || typeof max === 'null';

  const from = !isMin ? min * multiplier : '';
  const to = !isMax ? max * multiplier : '';

  return from || to ? `${from}..${to}` : null;
};

export const makeDateRange = (start, end) => {
  const from = start || '';
  const to = end || '';

  return from || to ? `${from}..${to}` : null;
};

export const formatFilterDate = date =>
  date ? `${moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z` : undefined;
export const formatDateToISO = date =>
  date ? moment(date).toISOString() : undefined;
export const formatDateToDay = date =>
  date ? moment(date).format('YYYY-MM-DD') : undefined;

export const countObjectKeys = object =>
  Object.keys(object).filter(key => object[key]).length;

export const generateTimeSlotsList = () =>
  Array(144)
    .fill(0)
    .map((element, index) => {
      const timeSlot = moment('00:00', 'HH:mm')
        .add(index * 10, 'minutes')
        .format('HH:mm');
      return {
        id: timeSlot,
        title: timeSlot,
      };
    });

export const dateAndTimeToIso8601 = (date, time, utcOffset = 0) =>
  moment(
    `${moment(date).format('YYYY-MM-DD')}T${moment(time, 'HH:mm').format(
      'HH:mm',
    )}`,
  )
    .utcOffset(utcOffset)
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

export const objectToQueryString = object =>
  Object.keys(object)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join('&');

export const dictToOptions = (dict, idKey = 'id', valueKey = 'title') =>
  Object.keys(dict).map(dictKey => ({
    [idKey]: dictKey,
    [valueKey]: dict[dictKey].title,
  }));

export const calculateTimeDiff = (timeFrom, timeTo = Date.now()) =>
  !timeFrom ? 0 : moment(timeTo).diff(moment(timeFrom));

export const declOfNum = (number, titles) => {
  // console.error(`declOfNum is deprecated, use pluralize instead`); // eslint-disable-line

  const cases = [2, 0, 1, 1, 1, 2];

  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export const pluralize = (
  number: any,
  one: string,
  few: string,
  other: string,
) => {
  if (typeof number !== 'undefined') {
    if (
      number % 10 === 0 ||
      (number >= 5 % 10 && number % 10 <= 9) ||
      (number >= 11 % 100 && number % 100 <= 14)
    ) {
      return other;
    }
    if (number >= 2 % 10 && number % 10 <= 4) return few;

    return one;
  }
};

export const isElementInViewport = element => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const formatNumber = number => {
  if (number && typeof number !== 'undefined') {
    const orig = number.toString();
    let buf = '';

    for (let i = 0; i < orig.length; i++) {
      buf += orig[i];
      if ((orig.length - (i + 1)) % 3 === 0) buf += ' ';
    }

    return buf.trim();
  }
  return null;
};

export const formatPrice = (value, currency) => {
  const formattedValue = formatNumber(value);
  switch (currency) {
    case 'RUB':
      return `${formattedValue} ₽`;
    case 'USD':
      return `$ ${formattedValue}`;
    case 'EUR':
      return `€ ${formattedValue}`;
    default:
      return 0;
  }
};

const getChangeData = (change, previousModel, nextModel, keyPath, index) => {
  if (Array.isArray(change)) {
    // TODO Parent value detection logic is too complex here. Simplify it.
    const keyPathParts = keyPath.split('.');
    const parentKeyPathParts = keyPath
      .split('.')
      .splice(0, keyPathParts.length - 1);
    const parentKeyPath = parentKeyPathParts.join('.');

    if (change.length === 1) {
      const isArrayElement =
        parentKeyPathParts.length > 0 &&
        parentKeyPathParts[parentKeyPathParts.length - 1].indexOf('[') > -1;
      return {
        type: 'added',
        ...(isArrayElement
          ? { parentValue: get(nextModel, parentKeyPath) }
          : {}),
        value: change[0],
      };
    }
    if (change.length === 2) {
      return {
        type: 'changed',
        ...(index ? { parentValue: get(nextModel, parentKeyPath) } : {}),
        oldValue: change[0],
        value: change[1],
      };
    }
    if (change.length === 3 && change[2] === 0) {
      const isArrayElement =
        parentKeyPathParts.length > 0 &&
        parentKeyPathParts[parentKeyPathParts.length - 1].indexOf('[') > -1;

      return {
        type: 'deleted',
        ...(isArrayElement
          ? { parentValue: get(previousModel, parentKeyPath) }
          : {}),
        value: change[0],
      };
    }
    if (change.length === 3 && change[2] === 2)
      return { type: 'textdiff', value: change[0] };
    if (change.length === 3 && change[2] === 3) {
      return {
        type: 'moved',
        value: get(previousModel, keyPath),
        newIndex: change[1],
      };
    }
  }
  return { type: 'unknown' };
};

export const recursiveTraverseChanges = (
  object,
  previousModel,
  nextModel,
  currentKeyId = '',
  currentKeyPath = '',
  parentArrayIndex = null,
) => {
  const changes = [];

  Object.keys(object).forEach(key => {
    const [, arrayIndex = null] = key.match(/^_?(\d+)$/) || [];
    const newKeyPath = currentKeyPath
      ? `${currentKeyPath}${arrayIndex ? `[${arrayIndex}]` : `.${key}`}`
      : `${arrayIndex ? `[${arrayIndex}]` : key}`;
    const newKeyId = currentKeyId
      ? `${currentKeyId}${arrayIndex ? '' : `.${key}`}`
      : `${arrayIndex ? '' : key}`;

    if (
      object[key] &&
      !Array.isArray(object[key]) &&
      object[key] instanceof Object
    ) {
      recursiveTraverseChanges(
        object[key],
        previousModel,
        nextModel,
        newKeyId,
        newKeyPath,
        arrayIndex,
      ).forEach(change => changes.push(change));
    } else if (key !== '_t') {
      const index = parentArrayIndex || arrayIndex;
      changes.push({
        id: newKeyId,
        keyPath: newKeyPath,
        index: index && parseInt(index, 10),
        ...getChangeData(
          object[key],
          previousModel,
          nextModel,
          newKeyPath,
          index,
        ),
      });
    }
  });

  return changes;
};

export const formatPriceWithGrouping = value => {
  if (!value) return '';

  const numberParts = value.toString().split('.');

  return `${numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${
    numberParts.length > 1 ? `.${numberParts[1]}` : ''
  }`;
};

// Thanks to https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
export const scrollElement = (el, offset, durationTime) => {
  const target = Math.round(offset);
  const duration = Math.round(durationTime);
  const element = el;

  if (duration < 0) {
    return Promise.reject('bad duration');
  }

  if (duration === 0) {
    element.scrollTop = target;
    return Promise.resolve();
  }

  const startTime = Date.now();
  const endTime = startTime + duration;
  const startTop = element.scrollTop;
  const distance = target - startTop;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const calculateSmoothStep = (start, end, point) => {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const newX = (point - start) / (end - start); // interpolation
    return newX * newX * (3 - 2 * newX);
  };

  return new Promise((resolve, reject) => {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    let previousTop = element.scrollTop;

    // This is like a think function from a game loop
    const scrollFrame = () => {
      if (element.scrollTop !== previousTop) {
        reject('interrupted');
        return;
      }

      // set the scrollTop for this frame
      const now = Date.now();
      const point = calculateSmoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + distance * point);
      element.scrollTop = frameTop;

      // check if we're done!
      if (now >= endTime) {
        resolve();
        return;
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
        resolve();
        return;
      }

      previousTop = element.scrollTop;

      // schedule next frame for execution
      if (window) window.setTimeout(scrollFrame, 0);
    };

    // boostrap the animation process
    if (window) window.setTimeout(scrollFrame, 0);
  });
};

export const formatByDictionary = (value, dictionary) => dictionary[value];

export const formatByMinMax = (value = {}, postfix = '', prefix = '') => {
  const { min, max } = value;
  const hasMin = min && min !== 'min';
  const hasMax = max && max !== 'max';

  if (hasMin || hasMax) {
    if (hasMin && !hasMax) {
      return `от ${prefix}${min}${postfix}`;
    }

    if (!hasMin && hasMax) {
      return `до ${prefix}${max}${postfix}`;
    }

    if (hasMin && hasMax) {
      return `${prefix}${min} — ${prefix}${max}${postfix}`;
    }
  }
};

export const checkBooleanField = field => {
  if (typeof field !== 'undefined') {
    return field.toString() === 'true';
  }
};

export const getDateLimits = (date, kind, offset = 0, utcOffset = 0) => {
  if (kind === 'start') {
    return `${moment(date)
      .add(offset, 'd')
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .utcOffset(utcOffset)
      .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
  }
  if (kind === 'end') {
    return `${moment(date)
      .add(offset, 'd')
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
      .utcOffset(utcOffset)
      .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
  }
};
