import styled from 'styled-components';

export default styled.input`
    width: 100%;
    padding: 15px 12px 14px 12px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 8px;
    appearance: none;
    line-height: 15px;
    font-size: 15px;
    font-weight: 500;
    color: #232323;

    &::-webkit-input-placeholder {
        color: #aaa;
    }

    &:focus {
        outline: none;
        border: 1px solid #999999;
    }
`;
