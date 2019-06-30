import styled from 'styled-components';
import React, { useState } from 'react';

import Dropdown from './Dropdown';
import { IconButton } from '../../UI/molecules';
import { media } from '../../../utils';
import CurrencySelector from './Dropdown/CurrencySelector';
import formConfig from './formConfig';
import TextInput from './TextInput';

const handleSubmit = e => {
    e.preventDefault();
};

const initialState = {
    sale: {
        currency: {
            label: '₽',
            multiplier: 50,
            value: 'rub',
        },
    },
    rent: {
        currency: {
            label: '₽',
            multiplier: 50,
            value: 'rub',
        },
    },
    objectNumber: {},
    settlements: {},
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
                {formConfig.types[type].fields.map(name => {
                    const { title, placeholder, items = [], type: fieldType, main, range = {} } = formConfig.fields[
                        name
                    ];

                    if (fieldType === 'text') {
                        return (
                            <TextInput
                                placeholder={placeholder}
                                value={values[type][name]}
                                onChange={handleChange(name)}
                            />
                        );
                    }

                    if (name === 'price') {
                        range.multiplier = values.sale.currency.multiplier;
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
                                <CurrencySelector
                                    onChange={handleChange('currency')}
                                    initialValue={values.sale.currency}
                                />
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
            border-radius: 8px;

            flex: 1 1 33%;

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
        }

        > *:only-of-type {
            border: #eaeaea;
            border-radius: 12px;
        }

        ${TextInput} {
            flex: 2 0 66%;
        }
    }

    ${IconButton} {
        margin-left: 8px;
        border-radius: 12px;
        text-transform: none;
        fill: white;
    }
`;
