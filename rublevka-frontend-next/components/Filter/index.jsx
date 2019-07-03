import React, { useState } from 'react';
import styled from 'styled-components';
import xor from 'lodash/xor';
import { CheckboxGroup, Range, RadioGroup } from '@components/UI';
import Field from './Field';
import { filter } from '@utils';

const Filter = ({ className, dealType }) => {
    const [values, changeValues] = useState({
        currency: 'rub',
    });

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

    const handleResetField = (fieldName, resetTo = []) => () =>
        changeValues({
            ...values,
            [fieldName]: resetTo,
        });

    const handleRadioChange = fieldName => e =>
        changeValues({
            ...values,
            [fieldName]: e.target.value,
        });

    const handleCurrencyChange = e => {
        handleRadioChange('currency')(e);
        handleResetField('price', {});
    };

    const handleBedroomsChange = fieldName => e =>
        changeValues({
            ...values,
            [fieldName]: {
                from: e.target.value,
            },
        });

    const handleRangeChange = fieldName => value =>
        changeValues({
            ...values,
            [fieldName]: {
                ...values[fieldName],
                ...value,
            },
        });

    const isResetShown = fieldType => (values[fieldType] || []).length > 0;
    const isResetShownRange = fieldType => Object.keys(values[fieldType] || {}).length > 0;

    const isOnly = kind => (values.kind || []).length === 1 && values.kind[0] === kind;

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
                        ...(dealType === 'sale' ? { land: 'Участок' } : {}),
                        flat: 'Квартира',
                    }}
                />
            </Field>
            <Field title="Цена" showReset={isResetShownRange('price')} onReset={handleResetField('price', {})}>
                <Range
                    onChange={handleRangeChange('price')}
                    value={values.price}
                    options={filter.template.prices(values.currency, dealType)}
                />
                <RadioGroup
                    fields={{
                        usd: 'Доллары ($)',
                        rub: 'Рубли (₽)',
                        eur: 'Евро (€)',
                    }}
                    onChange={handleCurrencyChange}
                    value={values.currency}
                />
            </Field>
            {!isOnly('land') && (
                <Field
                    title="Площадь дома (м²)"
                    showReset={isResetShownRange('specification.area')}
                    onReset={handleResetField('specification.area', {})}
                >
                    <Range
                        onChange={handleRangeChange('specification.area')}
                        value={values['specification.area']}
                        options={filter.template.generic(2000, 100, value => `${value} м²`)}
                    />
                </Field>
            )}

            <Field
                title="Площадь участка (сот.)"
                showReset={isResetShownRange('landDetails.area')}
                onReset={handleResetField('landDetails.area', {})}
            >
                <Range
                    onChange={handleRangeChange('landDetails.area')}
                    value={values['landDetails.area']}
                    options={filter.template.generic(100, 10, value => `${value} сот.`)}
                />
            </Field>
            <Field
                title="Расстояние от МКАД"
                showReset={isResetShownRange('location.mkadDistance')}
                onReset={handleResetField('location.mkadDistance', {})}
            >
                <Range
                    onChange={handleRangeChange('location.mkadDistance')}
                    value={values['location.mkadDistance']}
                    options={filter.template.generic(30, 1, value => `${value} км`)}
                />
            </Field>
            {!isOnly('land') && (
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
            )}
            <Field
                title="Спален"
                showReset={isResetShown('specification.bedrooms')}
                onReset={handleResetField('specification.bedrooms', {})}
            >
                <RadioGroup
                    fields={{
                        0: 'Любое',
                        3: '3+',
                        4: '4+',
                        5: '5+',
                    }}
                    onChange={handleBedroomsChange('specification.bedrooms')}
                    value={(values['specification.bedrooms'] || {}).from || '0'}
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

    ${Range} + ${RadioGroup} {
        margin-top: 25px;
    }
`;
