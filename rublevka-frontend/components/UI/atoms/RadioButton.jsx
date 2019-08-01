/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

const RadioButton = ({ className, checked, onChange, value, label }) => (
    <label className={className}>
        <input type="radio" value={value} checked={checked} onChange={onChange} />
        <span className="icon" />
        {label}
    </label>
);

export default styled(RadioButton)`
    display: flex;
    align-items: center;
    padding: 8px 0px;
    position: relative;
    line-height: 20px;
    font-size: 16px;
    color: #232323;
    position: relative;

    cursor: pointer;

    input {
        opacity: 0;
        position: absolute;
    }

    .icon {
        display: block;
        border-radius: 50%;
        border: 1px solid #d9d9d9;

        width: 20px;
        height: 20px;

        margin-right: 10px;

        transition: 0.2s;
    }

    input:checked + .icon {
        border: 1px solid #999;

        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
            content: '';
            display: block;
            background: #999;
            border-radius: inherit;

            width: 60%;
            height: 60%;
        }
    }
`;
