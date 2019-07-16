import { css } from 'styled-components';

const createMedia = minWidth => (...args) =>
    css`
        @media screen and (min-width: ${minWidth}px) {
            ${css(...args)};
        }
    `;

const createMediaMax = maxWidth => (...args) =>
    css`
        @media screen and (max-width: ${maxWidth - 1}px) {
            ${css(...args)};
        }
    `;

const createMediaScope = (minWidth, maxWidthÎ) => ({
    max: createMediaMax(maxWidth),
    min: createMedia(minWidth),
});

export default {
    xs: createMedia(480),
    xsMax: createMediaMax(480),
    sm: createMedia(768),
    smMax: createMediaMax(768),
    md: createMedia(992),
    mdMax: createMediaMax(992),
    lg: createMedia(1200),
    lgMax: createMedia(1200),
    smallerThan: {
        phone: createMediaMax(480),
        phablet: createMediaMax(768),
        tablet: createMediaMax(992, 1200),
        desktop: createMediaMax(1200),
    },
    largerThan: {
        phone: createMedia(480),
        phablet: createMedia(768),
        tablet: createMedia(992),
        desktop: createMedia(1200),
    },
    phone: createMedia(480),
    tablet: createMedia(768),
    minDesktop: createMedia(992),
    desktop: createMedia(1200),
    upToPhone: createMediaMax(480),
    upToTablet: createMediaMax(768),
    upToMinDesktop: createMediaMax(992),
    upToDesktop: createMediaMax(1200),
};
