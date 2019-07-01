import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../atoms';

const CheckboxGroup = ({ className, fields, values = {}, onChange, onClickOnly }) => (
    <div className={className}>
        {Object.entries(fields).map(([fieldName, label]) => (
            <Checkbox
                key={fieldName}
                label={label}
                checked={values[fieldName]}
                onChange={e => onChange(fieldName, e)}
                onClickOnly={() => onClickOnly(fieldName)}
            />
        ))}
    </div>
);

export default styled(CheckboxGroup)`
    ${Checkbox}:not(:last-child) {
        margin-bottom: 3px;
    }
`;
