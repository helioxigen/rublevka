import styled from 'styled-components';
import { media } from '@utils';

export default styled.main`
    width: auto;
    margin: 0 auto;

    ${media.sm`
        max-width: 740px;
    `}

    ${media.md`
        max-width: 960px;
    `}

    ${media.lg`
        max-width: 1360px;
    `}
`;
