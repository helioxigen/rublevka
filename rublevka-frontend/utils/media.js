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

const createMed = minWidth => cssFn =>
    css`
        @media screen and (min-width: ${minWidth}px) {
            ${cssFn(css)};
        }
    `;

const createMedMax = maxWidth => cssFn =>
    css`
        @media screen and (max-width: ${maxWidth - 1}px) {
            ${cssFn(css)};
        }
    `;

const createMQ = width => ({
    at: createMed(width),
    to: createMedMax(width),
});

const mediaQueries = {
    phoneL: createMQ(480),
    tablet: createMQ(768),
    desktop: createMQ(992),
    desktopL: createMQ(1200),
};

/**
 *
 * @typedef {typeof mediaQueries} MediaQueries
 * @typedef {Record<keyof MediaQueries, typeof css>} MediaQueriesMap
 * @param {(css: typeof css) => MediaQueriesMap} getMap
 */
const mapAt = getMap => Object.entries(getMap(css)).map(([name, style]) => mediaQueries[name].at(() => style));

export default {
    xs: createMedia(480),
    xsMax: createMediaMax(480),
    sm: createMedia(768),
    smMax: createMediaMax(768),
    md: createMedia(992),
    mdMax: createMediaMax(992),
    lg: createMedia(1200),
    lgMax: createMedia(1200),
    ...mediaQueries,
    at: mapAt,
    touch: `@media (hover: none) and (pointer: coarse)`,
    nonTouch: `@media (hover: hover) and (pointer: fine)`,
};
