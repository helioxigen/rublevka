import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;
    margin: 0 auto;

    background: #fafafa;

    .breadcrumbs {
        display: none;
        ${media.tablet.at(
            css => css`
                display: block;
            `
        )}
    }

    ${sc.ifProp('noMargin')('', 'margin-bottom: 48px;')}
`;
