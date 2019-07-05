import { css } from 'styled-components';
import { slick, theme } from './slick';

const ifProp = (name, ifTrue, ifFalse) => props => (props[name] ? ifTrue : ifFalse);

const calcTranslateShift = (currentIdx, overall, hasLayoutImages, viewSize = 7) => {
    const size = hasLayoutImages ? viewSize - 1 : viewSize;

    const imagesLeft = overall - currentIdx - 1;

    const offsetIdx = Math.floor(viewSize / 2);

    const offset = currentIdx - offsetIdx;

    const startShift = offset < 0 ? 0 : offset;

    const shift = imagesLeft < offsetIdx ? overall - size : startShift;

    return `translateX(calc(-${shift}/${viewSize}*100%))`;
};

export default {
    ifProp,
    reset: {
        button: css`
            background: none;
            border: none;
            font-size: inherit;
        `,
    },
    calcTranslateShift,
    slick: {
        slick,
        theme,
    },
};
