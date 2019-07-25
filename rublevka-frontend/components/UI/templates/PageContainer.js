import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    overflow: hidden;

    background: #fafafa;

    ${media.desktop.at(
        css => css`
            padding: 0 ${sc.ifProp('fullWidth')(0, 50)}px 0;
        `
    )}

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
