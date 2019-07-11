import { css, keyframes } from 'styled-components';
import theme from './theme';

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
    theme,
    calcTranslateShift,
    keyframes: {
        slideIn: keyframes`
            0% {
                transform: translateY(1rem);
                opacity: 0;
            }

            100% {
                transform: translateY(0rem);
                opacity: 1;
            }
            0% {
                transform: translateY(1rem);
                opacity: 0;
            }
        `,
        slideRight: keyframes`
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        `,
        poof: keyframes`
            from {
                top: 0;
                opacity: 0.6;
            }
            
            to {
                transform: translateY(-100%);
                opacity: 0;
            }
        `,
    },
};
