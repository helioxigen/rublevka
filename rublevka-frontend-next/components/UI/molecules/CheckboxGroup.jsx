import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../atoms';

const CheckboxGroup = ({ className, fields, values = [], onChange, emptyAsFull }) => {
    const getChecked = fieldName => (!values.length && emptyAsFull) || values.includes(fieldName);

    return (
        <div className={className}>
            {Object.entries(fields).map(([fieldName, label]) => (
                <Checkbox
                    key={fieldName}
                    label={label}
                    checked={getChecked(fieldName)}
                    onChange={e => onChange(fieldName, e.target.checked)}
                    showOnly={
                        fieldName !== 'all' &&
                        (!(values.length === 1 && values.includes(fieldName)) || values.length === 0)
                    }
                    onClickOnly={() => onChange(fieldName, true, true)}
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
