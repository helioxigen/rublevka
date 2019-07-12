import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    ${media.sm`
        max-width: 740px;
    `}

    ${media.md`
        max-width: 960px;
    `}

    ${media.lg`
        max-width: ${sc.ifProp('compact', 1110, 1340)}px;
    `}
`;
