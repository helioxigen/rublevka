import styled from 'styled-components';

export default styled.span`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &:not(:last-child) {
        padding-right: 2px;
    }

    transition: opacity 125ms cubic-bezier(0.215, 0.61, 0.355, 1);

    ::after {
        content: '';
        border-radius: 2px;
        display: block;
        height: 3px;
        width: 100%;

        transition: 0.3s;

        z-index: 2;

        background-color: rgba(238, 238, 238, 0.5);
    }

    &:hover::after {
        background-color: #f44336;
    }
`;
