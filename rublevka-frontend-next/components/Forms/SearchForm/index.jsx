import styled from 'styled-components';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fromPairs from 'lodash/fromPairs';

import Dropdown from './Dropdown';
import { IconButton } from '../../UI/molecules';
import { media, filter, page, dict } from '../../../utils';
import CurrencySelector from './Dropdown/CurrencySelector';
import formConfig from './formConfig';
import TextInput from './TextInput';
import { Icon } from '@components/UI';
import { setCurrency } from '@store';

// const initialState = {
//     sale: {
//         currency: {
//             label: '₽',
//             value: 'rub',
//         },
//     },
//     rent: {
//         currency: {
//             label: '₽',
//             value: 'rub',
//         },
//     },
//     objectNumber: {},
//     settlements: {},
// };

const SearchForm = ({ className, type = 'sale' }) => {
    const currency = useSelector(state => state.user.currency);
    const dispatch = useDispatch();
    const [values, changeValues] = useState({});

    const config = formConfig.types[type];

    const handleChange = (fieldName, isMain) => item => {
        // const currentValues = isMain ? {} : values[type];

        changeValues({
            ...values,
            [type]: {
                ...values[type],
                [fieldName]: item,
            },
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (config.type === 'query') {
            const query = Object.entries(values[type]).map(([fieldName, value]) => {
                let queryValue = value;
                let { queryField, queryTpl } = formConfig.fields[fieldName];

                if (fieldName === 'price') {
                    queryField = queryTpl(type, currency);
                    if (queryValue.from) {
                        queryValue.from = value.from * 1000000;
                    }

                    if (queryValue.to) {
                        queryValue.to = value.to * 1000000;
                    }
                }

                return [queryField, queryValue];
            });

            page.goTo.catalog({
                filter: JSON.stringify(fromPairs(query)),
                dealType: dict.translit.byWord(type),
            });
        }
    };

    const handleCurrencyChange = cur => dispatch(setCurrency(cur));

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
                                key={`${name}${type}`}
                                placeholder={placeholder}
                                value={values[type][name]}
                                onChange={handleChange(name)}
                            />
                        );
                    }

                    if (name === 'price' && values[type]) {
                        range.options = filter.template.prices(currency, type);
                        range.template = v => range.priceTemplate(v, type);
                    }

                    const itemsList = type in items ? items[type] : items;

                    return (
                        <Dropdown
                            key={`${name}${type}`}
                            label={title}
                            placeholder={placeholder}
                            items={itemsList}
                            onChange={handleChange(name, main)}
                            type={fieldType}
                            range={range}
                            fieldName={name}
                        >
                            {name === 'price' && (
                                <CurrencySelector onChange={handleCurrencyChange} initialValue={currency} />
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
    height: 68px;

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

        padding: 0 24px;
        font-size: 20px;

        ${Icon} {
            width: 28px;
            height: 28px;
            margin-right: 0.2em;
        }
    }
`;
