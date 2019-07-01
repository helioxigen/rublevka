/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const Checkbox = ({ className, checked, onChange, label, showOnly, onClickOnly }) => (
    <label className={className}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="label">{label}</span>
        {showOnly && (
            <a tabIndex={0} onKeyDown={onClickOnly} onClick={onClickOnly} role="button">
                Только
            </a>
        )}
    </label>
);

const markSvgBase =
    "data:image/svg+xml,%3Csvg width='13' height='10' viewBox='0 0 13 10' fill='….35 10 4.25 9.95 4.15 9.85L0.25 5.65L0.15 5.5Z' fill='black'/%3E%3C/svg%3E";

export default styled(Checkbox)`
    display: flex;
    align-items: center;

    cursor: pointer;

    padding: 6px;
    margin-left: -6px;

    transition: background-color 0.2s;

    &:hover {
        background: #f2f2f2;
        border-radius: 4px;
    }

    input {
        position: relative;
        width: 20px;
        height: 20px;
        margin: 0;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        background: white;
        appearance: none;
    }

    input:checked {
        background: white url(${markSvgBase}) 50% no-repeat;
        border-color: #999999;
        outline: none;
    }

    .label {
        margin-left: 10px;
        font-size: 16px;
        color: #232323;
        cursor: pointer;
    }

    a {
        color: hsl(4, 90%, 58%);
        display: none;

        outline: none;

        position: absolute;
        right: 0;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(242, 242, 242, 1) 29%);
        padding-left: 14%;

        transition: color 0.2s;

        &:hover {
            color: hsl(4, 90%, 45%);
        }

        &:active {
            color: hsl(4, 90%, 39%);
        }
    }

    ${media.md`
        &:hover a{
            display: block;
        }
    `}
`;
