import styled from 'styled-components';

export default styled.span`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    transition: 0.3s;

    &:not(:last-child) {
        padding-right: 2px;
    }

    z-index: 2;

    & + img {
        z-index: 1;
        opacity: 0;
        position: absolute;

        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        object-fit: cover;

        width: 100%;
        height: 100%;
        transition: 0.1s;
    }

    &:hover + img {
        opacity: 1;
    }

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
