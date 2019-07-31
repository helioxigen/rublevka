import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;

    margin: 0 auto;

    ${media.at(css => ({
        tablet: css`
            max-width: 740px;
        `,
        desktop: css`
            max-width: 940px;
        `,
        desktopL: css`
            max-width: ${sc.ifProp('compact')(1110, 1340)}px;
        `,
    }))}
`;
