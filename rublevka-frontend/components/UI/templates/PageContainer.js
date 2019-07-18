import styled from 'styled-components';
import { media } from '@utils';
import { Breadcrumbs } from '@components';

export default styled.div`
    width: auto;
    margin: 0 auto;

    background: #fafafa;

    padding-top: 48px;

    ${media.mediaquery.tabletLandscape.at(
        css => css`
            padding-top: 60px;
        `
    )}

    ${Breadcrumbs} {
        display: none;
        ${media.mediaquery.tablet.at(
            css => css`
                display: block;
            `
        )}
    }

    margin-bottom: 48px;
`;
