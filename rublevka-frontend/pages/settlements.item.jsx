/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header, SettlementsListLayout, Button, SettlementsCallbackBlock, PageContainer } from '@components/UI';
import { ItemHero } from '@components/Settlements';
import { CallbackForm } from '@components/Forms';
import { Summary } from '@components/Item';
import SettlementsItemLayout from '@components/UI/templates/SettlementsItemLayout';
import { fetchSettlementsItem } from '@store';
import { Breadcrumbs } from '@components';
import { dict } from '@utils';
import api from '@api';

const SettlementsItemPage = ({ id }) => {
    const { name, statistics: { totalProperties } = {}, location = {}, details = {} } =
        useSelector(state => state.settlements.items[id]) || {};

    return (
        <PageContainer fullWidth>
            <SettlementsItemLayout>
                <ItemHero>
                    <Breadcrumbs
                        className="breadcrumbs"
                        second={['/settlements.list', '/zagorodnaya/kottedzhnye-poselki', 'Посёлки']}
                        last={[
                            `/settlements.item?id=${id}`,
                            `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}`,
                            name,
                        ]}
                    />
                    <div className="title">
                        <h1>
                            <span className="desktop-only">Посёлок</span> {name}
                        </h1>
                        <Button red>
                            <span className="phone-only">Информация</span> о посёлке
                        </Button>
                    </div>
                    <CallbackForm
                        fullWidth
                        header={<h2>Подобрать объект в посёлке</h2>}
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
                        submitLabel="Оставить заявку"
                        defaultComment={`Подобрать объект в посёлке ${name} ID:${id}`}
                    />
                </ItemHero>
                <article />
            </SettlementsItemLayout>
        </PageContainer>
    );
};

SettlementsItemPage.getInitialProps = async ({ store, query: { id } }) => {
    await store.dispatch(fetchSettlementsItem(id));

    return { id, title: id };
};

export default SettlementsItemPage;
