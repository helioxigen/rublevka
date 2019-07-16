import styled from 'styled-components';
import Hero from '../../Landing/Hero';
import { Button } from '../atoms';
import Location from '@components/Landing/Location';
import { media } from '@utils';

export default styled.main`
    ${media.xs`
        display: grid;

        grid-template:
            100vh repeat(2, 640px)
            / [start] 20px [first] 40fr 60fr [last] 20px [end];

        grid-gap: 30px;
    `}
    ${Hero} {
        grid-column: 1 / span end;
    }

    .call-block {
        padding: 0 114px;
        grid-column: first / span last;
    }

    .sell-block {
        padding: 0 42px;
    }

    figure {
        grid-column: first;

        margin: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

    ${Location} {
        grid-column: first / span last;
        margin: 40px 0 0;

        ${media.xs`
            margin-bottom: 32px;
        `}

        ${media.md`
            margin: 60px 0 72px;
        `};
    }
`;
