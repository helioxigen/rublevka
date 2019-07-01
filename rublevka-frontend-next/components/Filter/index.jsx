import React, { useState } from 'react';
import styled from 'styled-components';
import xor from 'lodash/xor';
import { CheckboxGroup } from '@components/UI';
import Field from './Field';

const Filter = ({ className }) => {
    const [values, changeValues] = useState({
        kind: [],
    });

    const handleKindChange = (fieldName, checked, isOnly) => {
        if (isOnly)
            return changeValues({
                kind: [fieldName],
            });

        if (fieldName === 'all' && checked)
            return changeValues({
                kind: [],
            });

        if (values.kind)
            return changeValues({
                kind: xor(values.kind.length === 0 ? ['house', 'townhouse', 'land', 'flat'] : values.kind, [fieldName]),
            });
    };

    return (
        <aside className={className}>
            <Field title="Тип объекта">
                <CheckboxGroup
                    emptyAsFull
                    values={values.kind}
                    onChange={handleKindChange}
                    fields={{
                        all: 'Все',
                        house: 'Дом',
                        townhouse: 'Таунхаус',
                        land: 'Участок',
                        flat: 'Квартира',
                    }}
                />
            </Field>
        </aside>
    );
};

export default styled(Filter)`
    grid-area: filter;
`;
