import React, { useState } from 'react';
import styled from 'styled-components';
import xor from 'lodash/xor';
import { CheckboxGroup } from '@components/UI';
import Field from './Field';

const Filter = ({ className }) => {
    const [values, changeValues] = useState({});

    const handleCheckboxChange = fieldType => (fieldName, checked, isOnly, fields) => {
        if (isOnly)
            return changeValues({
                ...values,
                [fieldType]: [fieldName],
            });

        if (fieldName === 'all' && checked)
            return changeValues({
                ...values,
                [fieldType]: [],
            });

        const currentVals = values[fieldType] || [];
        const fullVals = Object.keys(fields).filter(f => f !== 'all');

        return changeValues({
            ...values,
            [fieldType]: xor(currentVals.length === 0 ? fullVals : currentVals, [fieldName]),
        });
    };

    const handleResetField = fieldName => () =>
        changeValues({
            ...values,
            [fieldName]: [],
        });

    const isResetShown = fieldType => (values[fieldType] || []).length > 0;

    return (
        <aside className={className}>
            <Field title="Тип объекта" showReset={isResetShown('kind')} onReset={handleResetField('kind')}>
                <CheckboxGroup
                    emptyAsFull
                    values={values.kind}
                    onChange={handleCheckboxChange('kind')}
                    fields={{
                        all: 'Все',
                        house: 'Дом',
                        townhouse: 'Таунхаус',
                        land: 'Участок',
                        flat: 'Квартира',
                    }}
                />
            </Field>
            <Field title="Ремонт" showReset={isResetShown('renovate')} onReset={handleResetField('renovate')}>
                <CheckboxGroup
                    emptyAsFull
                    values={values.renovate}
                    onChange={handleCheckboxChange('renovate')}
                    fields={{
                        all: 'Любой',
                        full_construction: 'Под ключ',
                        partly_turnkey: 'Частично под ключ',
                        rough_finish: 'Черновая отделка',
                    }}
                />
            </Field>
        </aside>
    );
};

export default styled(Filter)`
    grid-area: filter;

    ${Field}:not(:last-child) {
        margin-bottom: 40px;
    }
`;
