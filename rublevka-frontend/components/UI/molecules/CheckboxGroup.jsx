import React from 'react';
import styled from 'styled-components';
import xor from 'lodash/xor';
import { Checkbox } from '../atoms';

const CheckboxGroup = ({ className, fields, values = [], onChange, emptyAsFull }) => {
    const fieldEntries = Object.entries(fields);

    const getChecked = fieldName =>
        (fieldName === 'all' && values.length === fieldEntries.length - 1) ||
        (!values.length && emptyAsFull) ||
        values.includes(fieldName);
    const fieldsList = Object.keys(fields).filter(f => f !== 'all');

    const handleChange = fieldName => e => {
        const { checked } = e.target;

        if (fieldName === 'all' && checked) return onChange([]);

        return onChange(xor(values.length === 0 ? fieldsList : values, [fieldName]));
    };

    const handleOnlyClick = fieldName => () => onChange([fieldName]);

    return (
        <div className={className}>
            {fieldEntries.map(([fieldName, label]) => (
                <Checkbox
                    key={fieldName}
                    label={label}
                    checked={getChecked(fieldName)}
                    onChange={handleChange(fieldName)}
                    showOnly={
                        fieldName !== 'all' &&
                        (!(values.length === 1 && values.includes(fieldName)) || values.length === 0)
                    }
                    onClickOnly={handleOnlyClick(fieldName)}
                />
            ))}
        </div>
    );
};

export default styled(CheckboxGroup)`
    ${Checkbox}:not(:last-child) {
        margin-bottom: 3px;
    }
`;
