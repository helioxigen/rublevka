import React from 'react';
import styled from 'styled-components';

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
    width: 50%;
    font-size: 13px;
    color: #636363;
    background: #ffffff;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: none;
    appearance: none;

    font-weight: 500;
    font-size: 15px;
    padding: 11px 12px;
    display: inline-block;
    vertical-align: top;
    border-color: #d9d9d9;
    border-radius: 0.4rem;

    color: #636363;

    outline: none;

    & option[disabled] {
        display: none;
    }

    &:hover {
        cursor: pointer;
        border-color: #999;
    }
`;
