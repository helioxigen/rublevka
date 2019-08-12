import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CheckboxGroup, Range, RadioGroup, AdaptiveSidebar, ResetToolbar, Button } from '@components/UI';
import Field from './Field';
import { filter, media } from '@utils';
import { setCurrency, setFilter } from '@store';
import { useSelector } from '@hooks';

const Filter = ({
    className,
    children,
    dealType,
    isFetching,
    totalItems,
    isOpen,
    onClose,
    short = false,
    switchDealType,
}) => {
    const [isShort, setShort] = useState(short);
    const values = useSelector(state => state.properties.filter);
    const fetching = useSelector(state => state.properties.fetching);
    const currency = useSelector(state => state.user.currency);
    const dispatch = useDispatch();

    const isOnly = kind => (values.kind || []).length === 1 && values.kind[0] === kind;

    return (
        <AdaptiveSidebar
            as="aside"
            isOpen={isOpen}
            left
            onClose={onClose}
            className={className}
            outer={
                isOpen &&
                !(fetching || isFetching) && (
                    <div className="show-button-wrapper">
                        <Button className="show-button" red onClick={onClose}>
                            Показать {totalItems} объектов
                        </Button>
                    </div>
                )
            }
        >
            <ResetToolbar
                className="reset-toolbar"
                onClose={onClose}
                onReset={() => dispatch(setFilter({}, true))}
                isResetActive={Object.keys(values).length > 0}
            />
            {children}
            {switchDealType && (
                <Field title="Тип сделки" name="dealType">
                    {({ value, onChange }) => (
                        <RadioGroup
                            fields={{
                                sale: 'Продажа',
                                rent: 'Аренда',
                            }}
                            onChange={e => {
                                onChange(e.target.value);
                            }}
                            value={value}
                        />
                    )}
                </Field>
            )}
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

                                dispatch(setCurrency(e.target.value));
                            }}
                            value={currency}
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
            {isShort && (
                <a
                    className="expand-button"
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => setShort(false)}
                    onClick={() => setShort(false)}
                >
                    Ещё фильтры
                </a>
            )}
            <div className="expandable-filters" data-hidden={isShort}>
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
                        <Range
                            onChange={onChange}
                            value={value}
                            options={filter.template.generic(30, 1, v => `${v} км`)}
                        />
                    )}
                </Field>
                {!isOnly('land') && (
                    <>
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
                        <Field title="Спален" name="specification.bedrooms">
                            {({ value, onChange }) => (
                                <RadioGroup
                                    fields={{
                                        0: 'Любое',
                                        2: '2+',
                                        3: '3+',
                                        4: '4+',
                                        5: '5+',
                                    }}
                                    onChange={e => onChange({ from: e.target.value })}
                                    value={(value.from || 0).toString()}
                                />
                            )}
                        </Field>
                    </>
                )}
            </div>
        </AdaptiveSidebar>
    );
};

export default styled(Filter)`
    grid-area: filter;

    /* padding: 15px; */

    ${media.desktop.at(
        css => css`
            padding: 0;
        `
    )}

    ${Field}:not(:last-child) {
        margin-bottom: 40px;
    }

    ${Field}:last-child {
        margin-bottom: 80px;

        ${media.desktop.at(
            css => css`
                margin-bottom: 50px;
            `
        )}
    }

    ${Range} + ${RadioGroup} {
        margin-top: 16px;
    }

    .expand-button {
        font-weight: 600;
        cursor: pointer;
        text-transform: uppercase;
        text-decoration: underline;
        display: none;

        &:hover{
            text-decoration: none;
        }
    }

    .expandable-filters {
        display: contents;
        margin-bottom: 200px;
    }

    .show-button-wrapper {
        width: 100%;
        left: 0px;
        bottom: 0px;
        z-index: 500;
        position: fixed;
        display: flex;
        justify-content: center;
    }


    .show-button {
        
        width: 100%;
        margin: 15px;


        @keyframes appear {
            from {
                transform: translateY(200%);
            }
            to {
                transform: translateY(0);
            }
        }

        animation: appear 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

        transition: transform 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    ${media.desktop.at(
        css => css`
            .show-button {
                display: none;
            }
            .expandable-filters {
                &[data-hidden='true'] {
                    display: none;
                }
            }
            .expand-button {
                display: block;
            }
        `
    )}

    .reset-toolbar {
        /* padding: 15px 20px 0; */
        box-sizing: border-box;
    }
`;
