import styled from 'styled-components';
import { media } from '@utils';

export default styled.h1`
    margin: 0;
    font-weight: bold;

    font-size: 28px;

    display: none;

    ${media.at(css => ({
        tablet: css`
            display: block;
        `,
        desktopL: css`
            font-size: 32px;
        `,
    }))}
`;
