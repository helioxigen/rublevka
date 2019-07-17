/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { media, handlers } from '@utils';

const Checkbox = ({ className, checked, onChange, label, showOnly, onClickOnly }) => (
    <label className={className}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="label">{label}</span>
        {showOnly && (
            <a
                className="only-button"
                tabIndex={0}
                onKeyDown={handlers.preventNative(onClickOnly)}
                onClick={handlers.preventNative(onClickOnly)}
                role="button"
            >
                Только
            </a>
        )}
    </label>
);

const markSvgBase =
    "data:image/svg+xml,%3Csvg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.15 5.5C0.05 5.4 0 5.25 0 5.15C0 5.05 0.05 4.9 0.15 4.8L0.85 4.1C1.05 3.9 1.35 3.9 1.55 4.1L1.6 4.15L4.35 7.1C4.45 7.2 4.6 7.2 4.7 7.1L11.4 0.15H11.45C11.65 -0.05 11.95 -0.05 12.15 0.15L12.85 0.85C13.05 1.05 13.05 1.35 12.85 1.55L4.85 9.85C4.75 9.95 4.65 10 4.5 10C4.35 10 4.25 9.95 4.15 9.85L0.25 5.65L0.15 5.5Z' fill='black'/%3E%3C/svg%3E";

export default styled(Checkbox)`
    display: flex;
    align-items: center;
    position: relative;

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
        background: white url("${markSvgBase}") 50% no-repeat;
        border-color: #999999;
        outline: none;
    }

    .label {
        margin-left: 10px;
        font-size: 16px;
        color: #232323;
        cursor: pointer;
    }

    .only-button {
        right: 8px;
        font-size: 13px;
        color: hsl(4,90%,58%);
        display: none;
        outline: none;
        position: absolute;
        background: linear-gradient( 90deg, rgba(255,255,255,0) 0%, rgba(242,242,242,1) 29% );
        padding-left: 14%;
        transition: color 0.2s;
    }

    ${media.md`
        &:hover a{
            display: block;
        }
    `}
`;
