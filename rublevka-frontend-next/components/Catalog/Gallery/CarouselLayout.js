import styled from 'styled-components';
import { media } from '@utils';
import CarouselControl from './CarouselControl';

export default styled.div`
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        pointer-events: none;
        top: 0;
        bottom: 0;
        width: 80px;
        transition: opacity 0.5s;
        opacity: 0;
        z-index: 1;

        display: none;

        ${media.md`
            display: block;
        `}
    }

    &::before {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
        left: 0;
    }

    &::after {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
        right: 0;
    }

    &:hover {
        ::before,
        ::after {
            opacity: 1;
        }

        ${CarouselControl} {
            opacity: 1;
        }
    }

    img {
        width: 100%;
        height: 300px;
        object-fit: cover;

        pointer-events: none;

        ${media.xs`
            height: 400px;
        `}

        ${media.sm`
            height: 480px;
        `}

        ${media.md`
            height: 450px;
            pointer-events: all;
        `}
    }
`;
