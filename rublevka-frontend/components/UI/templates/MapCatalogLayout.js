import styled from 'styled-components';
import { sc, media } from '@utils';

export default styled.main`
    width: 100vw;
    height: 100vh;

    > aside {
        ${media.desktop.at(
            css => css`
                animation: ${sc.keyframes.slideRight} 225ms cubic-bezier(0, 0, 0.2, 1);
            `
        )}

        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        z-index: 200;

        display: flex;

        ${media.desktop.to(
            css => css`
                width: 100%;
                height: 58px;
            `
        )}
    }
`;
