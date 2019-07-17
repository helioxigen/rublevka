import styled from 'styled-components';
import { sc } from '@utils';

export default styled.main`
    width: 100vw;
    height: 100vh;

    > aside {
        animation: ${sc.keyframes.slideRight} 225ms cubic-bezier(0, 0, 0.2, 1);

        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        z-index: 200;

        display: flex;
    }
`;
