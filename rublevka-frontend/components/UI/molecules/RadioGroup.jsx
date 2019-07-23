import React from 'react';
import styled from 'styled-components';
import { RadioButton } from '../atoms';

const RadioGroup = ({ className, fields, entries, value = '', onChange }) => (
    <div className={className}>
        {(entries || Object.entries(fields)).map(([radioValue, label]) => (
            <RadioButton
                key={radioValue}
                checked={radioValue === value}
                value={radioValue}
                label={label}
                onChange={onChange}
            />
        ))}
    </div>
);

export default styled(RadioGroup)`
    ${RadioButton}:not(:last-child) {
        margin-bottom: 3px;
    }
`;
