import styled from 'styled-components';

export default styled.textarea`
    margin: 4px 0px;
    box-sizing: border-box;
    padding: 16px 15px 14px 15px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.75);
    appearance: none;

    font-weight: bold;
    line-height: 18px;
    font-size: 15px;
    text-transform: uppercase;
    color: #232323;

    &::-webkit-input-placeholder {
        color: #aaa;
    }
`;
