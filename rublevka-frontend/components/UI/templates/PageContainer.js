import styled from 'styled-components';
import { media } from '@utils';
import { Breadcrumbs } from '@components';

export default styled.div`
    width: auto;
    margin: 0 auto;

    background: #fafafa;

    padding-top: 48px;

    @media ${media.device.tabletLandscape} {
        padding-top: 60px;
    }

    ${Breadcrumbs} {
        display: none;
        @media ${media.device.tablet} {
            display: block;
        }
    }

    margin-bottom: 48px;
`;
