import styled from 'styled-components';
import { media } from '@utils';

export default styled.section`
    display: grid;
    grid-gap: 20px;

    grid-template-columns: 1fr;

    ${media.sm`
        grid-template-columns: 1fr 1fr;
    `}

    ${media.lg`
        grid-template-columns: 1fr 1fr 1fr;
    `}

    transition: opacity 225ms;

    opacity: ${({ fetching }) => (fetching ? 0.7 : 1)};
`;
