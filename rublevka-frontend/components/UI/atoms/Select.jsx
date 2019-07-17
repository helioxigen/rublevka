import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const Select = ({ className, options = [], placeholder, value = '', onChange }) => (
    <select placeholder={placeholder} className={className} value={value} onChange={e => onChange(e.target.value)}>
        <option value="" disabled>
            {placeholder}
        </option>
        {options.map(({ value: optionValue, label }) => (
            <option key={optionValue} value={optionValue}>
                {label}
            </option>
        ))}
    </select>
);

export default styled(Select)`
    padding: 20px 15px;
    width: 50%;
    font-size: 13px;
    color: #636363;
    background: #ffffff;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: none;
    appearance: none;

    color: #636363;

    outline: none;

    & option[disabled] {
        display: none;
    }

    &:hover {
        cursor: pointer;
        border-color: #999;
    }

    ${media.xs`
        font-weight: 500;
        font-size: 15px;
        padding: 11px 12px;
        display: inline-block;
        vertical-align: top;
        border-color: #d9d9d9;
        border-radius: .4rem;
        -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    `}
`;
