import global from 'window-or-global';
import { cloudfront } from '../../../../core/config/resources';

export const prefixZero = num => (num < 10 ? `0${num}` : num);
export const calcTranslateShift = (currentIdx, overall, hasLayoutImages) => {
  const size = hasLayoutImages ? 6 : 7;

  const imagesLeft = overall - currentIdx - 1;

  const offset = currentIdx - 3;

  const startShift = offset < 0 ? 0 : offset;

  const shift = imagesLeft < 3 ? overall - size : startShift;

  return `translateX(calc(-${shift}/7*100%))`;
};

export const getImageLink = (
  id,
  size = 1024,
  postfix = global.config.postfix,
) => `${global.config.cloudfront || cloudfront}/${id}-${postfix}-${size}`;
