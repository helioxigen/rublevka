import styled from 'styled-components';
import { media } from '@utils';

export default styled.h2`
    margin: 0;
    font-size: 24px;
    color: #fff;
    font-weight: bold;

    ${media.phoneL.to(
        css => css`
            font-size: 28px;
            box-sizing: border-box;
            padding: 0 15px 1em;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 180px;
        `
    )}

    ${media.at(css => ({
        phoneL: css`
            font-size: 32px;
        `,
        tablet: css`
            font-size: 40px;
        `,
        desktop: css`
            font-size: 45px;
        `,
    }))}
`;
