import styled from 'styled-components';
import { sc } from '../../../utils';

export default styled.button`
    background: ${sc.ifProp('red', '#F44336', '#47b34c')};
    border: 0;

    border-radius: 6px;
    padding: 1em;

    font-size: 1em;
    font-weight: bold;

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
