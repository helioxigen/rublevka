import styled from 'styled-components';
import { media } from '@utils';

export default styled.h1`
    margin: 0;
    font-weight: bold;

    font-size: 28px;

    @media ${media.device.desktop} {
        font-size: 32px;
    }
`;
