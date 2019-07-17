import styled from 'styled-components';
import { media } from '@utils';
import { Breadcrumbs } from '@components';

export default styled.div`
    width: auto;
    margin: 0 auto;

    background: #fafafa;

    padding-top: 48px;

    ${media.upToTablet`
        ${Breadcrumbs} {
            display: none;
        }
    `}

    ${media.minDesktop`
        padding-top: 60px;
    `}

    margin-bottom: 48px;
`;
