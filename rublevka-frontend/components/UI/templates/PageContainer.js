import styled from 'styled-components';
import { media } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    overflow: hidden;

    background: #fafafa;

    padding-top: 48px;

    ${media.mediaquery.tabletLandscape.at(
        css => css`
            padding-top: 60px;
        `
    )}

    .breadcrumbs {
        display: none;
        ${media.mediaquery.tablet.at(
            css => css`
                display: block;
            `
        )}
    }

    margin-bottom: 48px;
`;
