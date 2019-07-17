import styled from 'styled-components';
import { media } from '../../../utils';

export default styled.button`
    position: relative;
    outline: none;
    white-space: nowrap;
    line-height: 19px;
    font-size: 16px;
    border: none;
    background: none;
    margin: 0;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 225ms;

    &[data-selected='true'] {
        opacity: 1;
    }

    &[data-selected='false']:hover {
        opacity: 1;
    }

    ::before {
        content: '';
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
        transition: 400ms;
        border-bottom: 2px solid transparent;
        bottom: 0;
        left: 0;

        ${media.xs`
            border-bottom: 3px solid transparent;
        `}
    }

    font-weight: 600;

    ${media.xs`
        opacity: 0.8;
        font-weight: 700;
        padding-bottom: 17px;
        line-height: 21px;
        font-size: 18px;
        font-weight: normal;
        color: #ffffff;
        text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
    `}

    &[data-selected='true']::before {
        border-bottom-color: #f44336;

        ${media.xs`
            border-bottom-color: #ffffff;
        `}
    }

    &[data-selected='false']:hover::before {
        border-bottom-color: #f44336;

        ${media.xs`
            border-bottom-color: rgba(255, 255, 255, 0.5);
        `}
    }

    ${media.lg`
        padding-bottom: 16px;
    `}
`;
