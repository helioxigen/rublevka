import React from 'react';
import styled from 'styled-components';
import initial from 'lodash/initial';

const NativePriceRange = ({ className, options, value, onChange }) => (
    <div className={className}>
        <select value={value.from || ''} onChange={e => onChange({ from: e.target.value })}>
            <option data-placeholder value="">
                ОТ
            </option>
            {options.map(({ label, value: optVal }) => (
                <option key={optVal} value={optVal}>
                    {label}
                </option>
            ))}
        </select>
        <span className="line">–</span>
        <select value={value.to || ''} onChange={e => onChange({ to: e.target.value })}>
            <option data-placeholder value="">
                ДО
            </option>
            {initial(options)
                .filter(({ value: to }) => to > (value.from || 0))
                .map(({ label, value: optVal }) => (
                    <option key={optVal} value={optVal}>
                        {label}
                    </option>
                ))}
        </select>
    </div>
);

export default styled(NativePriceRange)`
    display: flex;
    width: 100%;
    align-items: center;

    .line {
        margin: 0 10px;
    }

    option[data-placeholder] {
        display: none;
    }

    select {
        flex: 1;
        padding: 15px 12px 14px 12px;
        background: rgba(255, 255, 255, 0.75);
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        border-radius: 8px;
        appearance: none;
        line-height: 15px;
        font-size: 15px;
        font-weight: 500;
        color: #232323;

        width: 100%;
        margin: 8px 0;

        position: relative;

        &::-webkit-input-placeholder {
            color: #aaa;
        }

        &:focus {
            outline: none;
            border: 1px solid #999999;
        }
    }
`;
