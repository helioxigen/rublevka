import styled from 'styled-components';
import { media } from '@utils';

export default styled.h1`
    margin: 0 0 0 24px;
    line-height: 38px;
    font-size: 28px;
    text-align: center;
    font-weight: bold;
    color: white;

    ${media.tablet.at(
        css => css`
            font-size: 44px;
            line-height: 56px;
        `
    )}
`;
