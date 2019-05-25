import { cloudfront } from './core/config/resources';
import { browserHistory } from 'react-router';

export { capitalize } from './config/utils';

export const makeFilterRange = (min, max, multiplier = 1) => {
  const isMin =
    min === 'min' || typeof min === 'undefined' || typeof min === 'null';
  const isMax =
    max === 'max' || typeof max === 'undefined' || typeof max === 'null';

  const from = !isMin ? min * multiplier : '';
  const to = !isMax ? max * multiplier : '';

  return from || to ? `${from}..${to}` : null;
};

export const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
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
      return `${formattedValue} руб`;
    case 'USD':
      return `$${formattedValue}`;
    case 'EUR':
      return `€${formattedValue}`;
    default:
      return 0;
  }
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

const getImageLink = id =>
  `https:${global.config.cloudfront || cloudfront}/${id}-thumbnail-512`;

export const ogMeta = (metaObj = {}) =>
  Object.entries(metaObj)
    .filter(([, content]) => !!content)
    .map(([propertyName, content]) => ({
      property: `og:${propertyName}`,
      content: propertyName === 'image' ? getImageLink(content) : content,
    }));

export const createQuery = (current, update) => {
  const nextParams = {
    ...current,
    ...update,
  };

  const query = Object.entries(nextParams)
    .filter(([, v]) => v !== null)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
};

export const pushQuery = (pathname, currentQuery, nextQuery) => {
  browserHistory.push(`${pathname}${createQuery(currentQuery, nextQuery)}`);
};
