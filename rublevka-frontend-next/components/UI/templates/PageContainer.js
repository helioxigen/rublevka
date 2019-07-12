import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    background: #fafafa;

    padding-top: 48px;

    ${media.md`
        padding-top: 60px;
    `}

    margin-bottom: 48px;
`;
