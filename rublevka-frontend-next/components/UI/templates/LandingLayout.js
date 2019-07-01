import styled from 'styled-components';
import Hero from '../../Landing/Hero';
import { Button } from '../atoms';

export default styled.main`
    display: grid;

    grid-template:
        100vh repeat(2, 640px)
        / [start] 20px [first] 40fr 60fr [last] 20px [end];

    grid-gap: 30px;

    ${Hero} {
        grid-column: 1 / span end;

        ${Button} {
            padding: 23px 24px;
            font-size: 18px;
        }
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
`;
