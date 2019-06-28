import { css } from 'styled-components';

const createMedia = minWidth => (...args) =>
    css`
        @media screen and (min-width: ${minWidth}px) {
            ${css(...args)};
        }
    `;

export default {
    xs: createMedia(480),
    sm: createMedia(768),
    md: createMedia(992),
    lg: createMedia(1200),
    xlg: createMedia(1440),
};
