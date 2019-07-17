import React from 'react';
import styled from 'styled-components';
import { Select } from '../atoms';

const Range = ({ className, options, value: { from, to } = {}, onChange }) => {
    const handleFromChange = value =>
        onChange({
            from: value,
            to: value > to ? undefined : to,
        });

    return (
        <div className={className}>
            <Select placeholder="от" value={from} options={options} onChange={handleFromChange} />
            <span className="risk">-</span>
            <Select
                placeholder="до"
                value={to}
                onChange={value => onChange({ to: value, from })}
                options={options.filter(({ value }) => value >= (from || 1))}
            />
        </div>
    );
};

export default styled(Range)`
    display: flex;
    align-items: center;

    .risk {
        font-size: 13px;
        font-weight: bold;

        margin: 0 4px;
    }
`;
