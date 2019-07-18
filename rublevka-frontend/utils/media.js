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

const createQue = (width, max) => `(${max ? 'max' : 'min'}-width: ${width - (max ? 1 : 0)}px)`;

const createQuery = maxWidth => `@media (min-width: ${maxWidth}px)`;
const createQueryMax = maxWidth => `@media (max-width: ${maxWidth - 1}px)`;

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
    device: {
        tablet: createQue(768),
        tabletLandscape: createQue(992),
        desktop: createQue(1200),
        upTo: {
            phone: createQue(480, true),
            tablet: createQue(768, true),
            tabletLandscape: createQue(992, true),
            desktop: createQue(1200, true),
        },
    },
    query: {
        tablet: createQuery(768),
        tabletLandscape: createQuery(992),
        desktop: createQuery(1200),
        upTo: {
            phone: createQueryMax(480),
            tablet: createQueryMax(768),
            tabletLandscape: createQueryMax(992),
            desktop: createQueryMax(1200),
        },
        upToPhone: createQueryMax(480),
        upToTablet: createQueryMax(768),
        upToMinDesktop: createQueryMax(992),
        upToDesktop: createQueryMax(1200),
    },
    mediaquery: {
        phone: createMQ(480),
        tablet: createMQ(768),
        tabletLandscape: createMQ(992),
        desktop: createMQ(1200),
    },
    touch: `@media (hover: none) and (pointer: coarse)`,
};
