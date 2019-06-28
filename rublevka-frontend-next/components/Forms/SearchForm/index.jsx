import styled from 'styled-components';
import React, { useState } from 'react';

import Dropdown from './Dropdown';
import config from './config';
import { IconButton } from '../../UI/molecules';

const handleSubmit = e => {
    e.preventDefault();
};

const SearchForm = ({ className, type = 'sale' }) => {
    const [values, changeValues] = useState({});

    const handleChange = (fieldName, isMain) => item => {
        const currentValues = isMain ? {} : values[type];

        changeValues({
            ...values,
            [type]: {
                ...currentValues,
                [fieldName]: item.value,
            },
        });
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {config.types[type].fields.map(name => {
                const { title, placeholder, items, type: fieldType, main } = config.fields[name];

                const itemsList = type in items ? items[type] : items;

                return (
                    <Dropdown
                        key={name}
                        label={title}
                        placeholder={placeholder}
                        items={itemsList}
                        onChange={handleChange(name, main)}
                        isRange={fieldType === 'range'}
                        fieldName={name}
                    />
                );
            })}
            <IconButton icon="search" type="submit" red>
                Найти
            </IconButton>
        </form>
    );
};

export default styled(SearchForm)`
    display: flex;
`;
