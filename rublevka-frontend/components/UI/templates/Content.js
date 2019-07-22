import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;

    margin: 0 auto;

    ${media.tablet.at(
        css => css`
            max-width: 740px;
        `
    )}

    ${media.desktop.at(
        css => css`
            max-width: 940px;
        `
    )}

    ${media.desktopL.at(
        css => css`
            max-width: ${sc.ifProp('compact')(1110, 1340)}px;
        `
    )}

    @media (min-width: 1440px) {
        margin: 0 auto;
    }
`;
// ${media.sm`
//     max-width: 740px;
// `}

// ${media.md`
//     max-width: 960px;
//     margin: 0 50px;
// `}

// ${media.lg`
//     max-width: ${sc.ifProp('compact')(1110, 1340)}px;
// `}
