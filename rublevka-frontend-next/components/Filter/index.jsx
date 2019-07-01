import React from 'react';
import styled from 'styled-components';
import { CheckboxGroup } from '@components/UI';
import Field from './Field';

const Filter = ({ className }) => (
    <aside className={className}>
        <Field title="Тип объекта">
            <CheckboxGroup
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

export default styled(Filter)`
    grid-area: filter;
`;
