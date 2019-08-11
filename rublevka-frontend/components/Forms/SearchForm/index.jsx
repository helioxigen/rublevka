import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import fromPairs from 'lodash/fromPairs';

import { IconButton } from '@components/UI/molecules';
import requests from '@requests';

import Dropdown from './Dropdown';
import { media, filter, page, dict, scrollToRef } from '@utils';
import formConfig from './formConfig';
import TextInput from './TextInput';
import FuseList from './FuseList';
import { getRangeName } from './templates';

const SearchForm = ({ className, type = 'sale', onChange, initialState }) => {
    const currency = useSelector(state => state.user.currency);
    const config = formConfig.types[type];

    const [values, changeValues] = useState({ [type]: initialState || config.defaultState });

    const myRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
    ]);
    const executeScroll = refIndex => {
        return () => {
            scrollToRef(myRefs.current[refIndex]);
        };
    };

    // useEffect(() => {
    //     changeValues({ [type]: config.defaultState });
    // }, [type]);

    const handleChange = fieldName => item => {
        // const currentValues = isMain ? {} : values[type];
        const value = {
            ...values[type],
            [fieldName]: item,
        };

        changeValues({
            ...values,
            [type]: value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (config.type === 'search' && !onChange) {
            if (!values[type]) return;

            const { settlementName, distance } = values[type];

            page.goTo.settlements({
                name: settlementName,
                distance: JSON.stringify(distance),
            });
        }

        if (config.type === 'id') {
            const { objectNumber: propertyId } = values[type];

            if (!propertyId) return;

            requests.search.property.byId(propertyId);
        }

        if (config.type === 'query') {
            if (!values[type]) return;

            const { kind, ...vals } = values[type];

            const query = Object.entries(vals).map(([fieldName, value]) => {
                let queryValue = value;
                const { queryTpl, queryField, rangeFrom } = formConfig.fields[fieldName];
                let nextField = queryField;

                if (fieldName === 'price') {
                    nextField = queryTpl(type, currency);
                }

                if (rangeFrom) {
                    queryValue = { from: value };
                }

                return [nextField, queryValue];
            });

            page.goTo.catalog({
                filter: JSON.stringify(fromPairs(query)),
                kind: dict.translit.byWord(kind),
                dealType: dict.translit.byWord(type),
            });
        }
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            <section className="form-body">
                {config.fields(values[type]).map((name, index) => {
                    const {
                        title,
                        placeholder,
                        items = [],
                        type: fieldType,
                        listSelector,
                        main,
                        range = {},
                    } = formConfig.fields[name];

                    const typeValues = values[type] || {};

                    if (fieldType === 'fuzzy') {
                        return (
                            <TextInput
                                key={`${name}${type}`}
                                placeholder={placeholder}
                                value={typeValues[name]}
                                onChange={handleChange(name)}
                                refLink={myRefs.current[index]}
                                onClick={executeScroll(index)}
                            >
                                <FuseList listSelector={listSelector} value={typeValues[name]} />
                            </TextInput>
                        );
                    }

                    if (fieldType === 'text') {
                        return (
                            <TextInput
                                key={`${name}${type}`}
                                placeholder={placeholder}
                                value={typeValues[name]}
                                onChange={handleChange(name)}
                            />
                        );
                    }

                    if (name === 'price') {
                        range.options = filter.template.prices(currency, type, 30);
                        range.template = v => range.priceTemplate(v, type);
                    }

                    const itemsList = type in items ? items[type] : items;

                    const dropdownInitialValue =
                        Object.keys(range).length && typeValues[name]
                            ? { value: typeValues[name], label: getRangeName(typeValues[name], range.template) }
                            : itemsList.find(i => i.value === typeValues[name]);

                    return (
                        <Dropdown
                            key={`${name}${type}`}
                            label={typeof title === 'string' ? title : title(type)}
                            placeholder={placeholder}
                            items={itemsList}
                            onChange={handleChange(name, main)}
                            type={fieldType}
                            range={range}
                            fieldName={name}
                            showCurrency={name === 'price'}
                            initialValue={dropdownInitialValue}
                        />
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
    flex-wrap: wrap;

    ${media.desktop.at(
        css => css`
            height: 68px;

            .search-button {
                height: 100%;
            }
        `
    )}

    .form-body {
        display: flex;

        flex: 1;

        > * {
            background: white;

            flex: 1 1 33%;

            ${media.desktop.to(
                css => css`
                    border: 1px solid #eee;
                    border-radius: 8px;
                `
            )}
        }

        ${media.desktop.to(
            css => css`
                display: grid;
                grid: 56px / 1fr 1fr;
                grid-gap: 8px;
                > *:first-of-type,
                > *:nth-child(2):last-child {
                    grid-column: 1 / -1;
                }
            `
        )}

        ${media.desktop.at(
            css => css`
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);

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
            `
        )}

        ${TextInput} {
            flex: 2 0 66%;
        }
    }

    > .search-button {
        color: white;

        padding: 0 24px;
        font-size: 20px;
        margin: 0 0 0 8px;
        border-radius: 12px;

        ${media.xs`
            text-transform: initial;
        `}
        

        [data-icon] {
            width: 28px;
            height: 28px;
            margin-right: 0.2em;
        }

        ${media.desktop.to(
            css => css`
                font-size: 15px;

                flex: 1 0 100%;
                margin: 16px 0 0;
                border-radius: 8px;
                line-height: 56px;
                [data-icon] {
                    display: none;
                }
            `
        )}        
    }
`;
