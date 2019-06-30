import styled from 'styled-components';
import React, { useState } from 'react';

import Dropdown from './Dropdown';
import config from './config';
import { IconButton } from '../../UI/molecules';
import { media } from '../../../utils';
import CurrencySelector from './Dropdown/CurrencySelector';

const handleSubmit = e => {
    e.preventDefault();
};

const initialState = {
    currency: {
        label: '₽',
        multiplier: 50,
        value: 'rub',
    },
};

const SearchForm = ({ className, type = 'sale' }) => {
    const [values, changeValues] = useState(initialState);

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
            <section className="form-body">
                {config.types[type].fields.map(name => {
                    const { title, placeholder, items = [], type: fieldType, main, range = {} } = config.fields[name];

                    if (name === 'price') {
                        range.multiplier = values.currency.multiplier;
                    }

                    const itemsList = type in items ? items[type] : items;

                    return (
                        <Dropdown
                            key={name}
                            label={title}
                            placeholder={placeholder}
                            items={itemsList}
                            onChange={handleChange(name, main)}
                            type={fieldType}
                            range={range}
                            fieldName={name}
                        >
                            {name === 'price' && (
                                <CurrencySelector onChange={handleChange('currency')} initialValue={values.currency} />
                            )}
                        </Dropdown>
                    );
                })}
            </section>
            <IconButton icon="search" type="submit" red>
                Найти
            </IconButton>
        </form>
    );
};

export default styled(SearchForm)`
    display: flex;

    .form-body {
        display: flex;

        flex: 1;

        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);

        > * {
            border: 1px solid #eeeeee;
            border-radius: 8px;

            flex: 1 auto;

            ${media.xs`
                border-radius: 0;
                border: 0;
            `}
        }

        > *:first-of-type {
            border-right: 1px solid #eaeaea;
            border-radius: 12px 0px 0px 12px;
        }

        > *:last-of-type {
            border-left: 1px solid #eaeaea;
            border-radius: 0px 12px 12px 0px;
            padding-left: 1.5px;
        }
    }

    ${IconButton} {
        margin-left: 8px;
        border-radius: 12px;
        text-transform: none;
    }
`;
