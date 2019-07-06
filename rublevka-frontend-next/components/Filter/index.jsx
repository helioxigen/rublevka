import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CheckboxGroup, Range, RadioGroup } from '@components/UI';
import Field from './Field';
import { filter } from '@utils';

const Filter = ({ className, dealType }) => {
    const values = useSelector(state => state.properties.filter);
    const userCurrency = useSelector(state => state.user.currency);

    const [currency, setCurrency] = useState(userCurrency);

    const isOnly = kind => (values.kind || []).length === 1 && values.kind[0] === kind;

    return (
        <aside className={className}>
            <Field title="Тип объекта" name="kind">
                {({ value, onChange }) => (
                    <CheckboxGroup
                        emptyAsFull
                        values={value}
                        onChange={onChange}
                        fields={{
                            all: 'Все',
                            house: 'Дом',
                            townhouse: 'Таунхаус',
                            ...(dealType === 'sale' ? { land: 'Участок' } : {}),
                            flat: 'Квартира',
                        }}
                    />
                )}
            </Field>
            <Field
                title="Цена"
                name={`${dealType}Offer.multiCurrencyPrice.${currency}`}
                range
                resetCheckFn={value => value.from || value.to}
            >
                {({ value, onChange }) => (
                    <>
                        <Range onChange={onChange} value={value} options={filter.template.prices(currency, dealType)} />
                        <RadioGroup
                            fields={{
                                usd: 'Доллары ($)',
                                rub: 'Рубли (₽)',
                                eur: 'Евро (€)',
                            }}
                            onChange={e => {
                                onChange({});

                                setCurrency(e.target.value);
                            }}
                            value={currency || 'rub'}
                        />
                    </>
                )}
            </Field>
            {!isOnly('land') && (
                <Field title="Площадь дома (м²)" name="specification.area" range>
                    {({ onChange, value }) => (
                        <Range
                            onChange={onChange}
                            value={value}
                            options={filter.template.generic(2000, 100, v => `${v} м²`)}
                        />
                    )}
                </Field>
            )}
            <Field title="Площадь участка (сот.)" name="landDetails.area" range>
                {({ value, onChange }) => (
                    <Range
                        onChange={onChange}
                        value={value}
                        options={filter.template.generic(100, 10, v => `${v} сот.`)}
                    />
                )}
            </Field>
            <Field title="Расстояние от МКАД" name="location.mkadDistance" range>
                {({ value, onChange }) => (
                    <Range onChange={onChange} value={value} options={filter.template.generic(30, 1, v => `${v} км`)} />
                )}
            </Field>
            {!isOnly('land') && (
                <Field title="Ремонт" name="specification.renovate">
                    {({ value, onChange }) => (
                        <CheckboxGroup
                            emptyAsFull
                            values={value}
                            onChange={onChange}
                            fields={{
                                all: 'Любой',
                                full_construction: 'Под ключ',
                                partly_turnkey: 'Частично под ключ',
                                rough_finish: 'Черновая отделка',
                            }}
                        />
                    )}
                </Field>
            )}
            <Field title="Спален" name="specification.bedrooms">
                {({ value, onChange }) => (
                    <RadioGroup
                        fields={{
                            0: 'Любое',
                            3: '3+',
                            4: '4+',
                            5: '5+',
                        }}
                        onChange={e => onChange({ from: e.target.value })}
                        value={value.from || '0'}
                    />
                )}
            </Field>
        </aside>
    );
};

export default styled(Filter)`
    grid-area: filter;

    ${Field}:not(:last-child) {
        margin-bottom: 40px;
    }

    ${Range} + ${RadioGroup} {
        margin-top: 25px;
    }
`;
