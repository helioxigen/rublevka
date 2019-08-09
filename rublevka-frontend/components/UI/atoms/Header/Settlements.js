import styled from 'styled-components';
import { media } from '@utils';

export default styled.h1`
    margin: 0 0 24px;
    font-size: 28px;
    line-height: 1.25;
    text-align: center;
    font-weight: bold;
    color: white;

    ${media.at(css => ({
        tablet: css`
            font-size: 40px;
        `,
        desktop: css`
            font-size: 48px;
        `,
    }))}
`;
