import React, { useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import groupBy from 'lodash/groupBy';
import { Header, SettlementsListLayout, Button, SettlementsCallbackBlock } from '@components/UI';
import { Hero, ListSection, ListNav } from '@components/Settlements';
import { SearchForm, CallbackForm } from '@components/Forms';
import { Element, Link as ScrollLink } from 'react-scroll';
import { Breadcrumbs } from '@components';
import { fetchSettlements, fetchSettlementsItem } from '@store';
import { dict, app } from '@utils';
import { Summary } from '@components/Item';

const SettlementsItemPage = ({ id }) => {
    const { name, statistics: { totalProperties } = {}, location = {}, details = {} } =
        useSelector(state => state.settlements.items[id]) || {};

    return (
        <SettlementsListLayout>
            <Hero
                item
                breadcrumbs={
                    <Breadcrumbs
                        second={['/zagorodnaya/kottedzhnye-poselki', 'Посёлки']}
                        last={[`/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}`, name]}
                    />
                }
            >
                <Header.Settlements className="item-header">Посёлок {name}</Header.Settlements>
                <p className="item-subheader">
                    Короткое SEO-описание посёлка с интересное информацией или выделением его особенностей.
                </p>
                <Button red>{totalProperties} доступных предложений</Button>
                <Summary
                    values={[
                        ['км от мкад', location.mkadDistance],
                        ['объектов в посёлке', totalProperties],
                        ['год постройки', details.foundationYear],
                    ]}
                />
            </Hero>
            <SettlementsCallbackBlock>
                <header>Презентация посёлка</header>
                <p>Обзор посёлка {name} и доступных предложений придёт вам на почту в течение 10 минут</p>
                <CallbackForm
                    fields={{
                        name: {
                            placeholder: 'Имя',
                            required: true,
                        },
                        phone: {
                            placeholder: 'Телефон',
                            type: 'tel',
                            required: true,
                        },
                    }}
                    submitLabel="Отправить заявку"
                    defaultComment={`Презентация посёлка ${name} ID:${id}`}
                />
            </SettlementsCallbackBlock>
            <article></article>
        </SettlementsListLayout>
    );
};

SettlementsItemPage.getInitialProps = async ({ store, query: { id } }) => {
    await store.dispatch(fetchSettlementsItem(id));

    return { id };
};

export default SettlementsItemPage;
