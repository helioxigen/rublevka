import styled from 'styled-components';
import { media } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    background: #fafafa;

    ${media.sm`
        max-width: 740px;
    `}

    ${media.md`
        max-width: 960px;
    `}

    ${media.lg`
        max-width: 1360px;
        padding-top: 60px;        
    `}
`;
