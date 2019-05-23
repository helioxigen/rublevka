import global from 'window-or-global';
import { cloudfront } from '../../../../core/config/resources';

export const prefixZero = num => (num < 10 ? `0${num}` : num);
export const calcTranslateShift = (
  currentIdx,
  overall,
  hasLayoutImages,
  viewSize = 7,
) => {
  const size = hasLayoutImages ? viewSize - 1 : viewSize;

  const imagesLeft = overall - currentIdx - 1;

  const offsetIdx = Math.floor(viewSize / 2);

  const offset = currentIdx - offsetIdx;

  const startShift = offset < 0 ? 0 : offset;

  const shift = imagesLeft < offsetIdx ? overall - size : startShift;

  return `translateX(calc(-${shift}/${viewSize}*100%))`;
};

export const getImageLink = (
  id,
  size = 1024,
  postfix = global.config.postfix,
) => `${global.config.cloudfront || cloudfront}/${id}-${postfix}-${size}`;
