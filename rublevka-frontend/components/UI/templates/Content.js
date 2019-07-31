import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.div`
    width: auto;

    margin: 0 auto;

    ${media.at(css => ({
        desktop: css`
            padding: 0 50px;
        `,
        desktopL: css`
            max-width: ${sc.ifProp('compact')(1110, 1340)}px;
        `,
    }))}

    ${media.tablet.at(() =>
        media.desktop.to(
            css => css`
                padding: 0 30px;

                ${sc.ifProp('item')(css`
                    padding: 0;
                    nav,
                    article > * {
                        margin-left: 30px;
                        margin-right: 30px;
                    }
                `)}
            `
        )
    )}
`;
