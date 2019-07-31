import styled from 'styled-components';
import { media } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    overflow: hidden;

    background: #fafafa;

    .breadcrumbs {
        display: none;
        ${media.tablet.at(
            css => css`
                display: block;
            `
        )}
    }

    margin-bottom: 48px;
`;
