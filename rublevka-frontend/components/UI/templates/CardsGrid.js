import styled from 'styled-components';
import { media, sc } from '@utils';

export default styled.section`
    display: grid;
    grid-gap: 20px;

    padding: 0 8px;

    grid-template-columns: 1fr;
    grid-auto-rows: min-content;

    @media ${media.device.tablet} {
        grid-template-columns: 1fr 1fr;
        padding: 0;
    }

    @media ${media.device.desktop} {
        grid-template-columns: 1fr 1fr 1fr;
    }

    transition: opacity 225ms;

    opacity: ${sc.ifProp('fetching')(0.65, 1)};
`;
