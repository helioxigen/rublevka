import styled from 'styled-components';
import { sc, media } from '../../../utils';

export default styled.button`
    background: ${sc.ifProp('red', '#F44336', '#47b34c')};
    border: 0;
    padding: 0 1em;
    outline: none;

    line-height: 56px;
    border-radius: 8px;

    ${media.phone`
        border-radius: 6px;
    `}

    font-size: 1em;
    font-weight: bold;

    ${media.upToMinDesktop`
        font-weight: 600;
    `}

    text-transform: uppercase;
    color: white;
    cursor: pointer;

    transition: 0.3s;

    &:hover {
        background: ${sc.ifProp('red', '#ff2b1b', '#00b44b')};
    }

    &:active {
        background: ${sc.ifProp('red', '#f92010', '#00a745')};
    }
`;
