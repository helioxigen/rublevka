import styled, { css } from 'styled-components';
import { sc } from '@utils';

export default styled.input`
    padding: 16px 15px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: white;
    appearance: none;
    outline: none;

    box-sizing: border-box;

    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
    color: #232323;

    ${sc.ifProp(
        'hasError',
        css`
            border: 2px solid #f44336;
        `
    )}

    &::-webkit-input-placeholder {
        color: #aaa;
    }
`;
