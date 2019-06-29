import styled from 'styled-components';
import { media, sc } from '../../../utils';

export default styled.button`
    position: relative;
    outline: none;
    white-space: nowrap;
    line-height: 19px;
    font-size: 16px;
    font-weight: 700;
    padding: 0;
    border: none;
    background: none;
    margin: 0;
    color: #232323;
    margin-bottom: 0;
    padding-bottom: 16px;
    opacity: 0.5;

    ::before {
        content: '';
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
        transition: 400ms;
        border-bottom: 2px solid transparent;
        bottom: 0;

        ${media.xs`
            border-bottom: 3px solid transparent;
        `}
    }

    ${sc.ifProp('objectNumber', 'display: none')}

    ${media.xs`
        ${sc.ifProp('objectNumber', 'display: block')}

        opacity: 0.8;
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
        transition-delay: 500ms;
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
