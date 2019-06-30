import styled, { css } from 'styled-components';
import { sc } from '../../../utils';

export default styled.button`
    background: ${sc.ifProp('red', '#F44336', '#47b34c')};
    border: 0;

    border-radius: 6px;
    padding: 1em;

    font-size: 1em;
    font-weight: 600;

    text-transform: uppercase;
    color: white;
    cursor: pointer;

    transition: 0.3s;

    &:hover {
        background: #00b44b;
    }

    &:active {
        background: #00a745;
    }
`;
