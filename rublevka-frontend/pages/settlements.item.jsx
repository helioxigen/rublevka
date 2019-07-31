/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
    Header,
    SettlementsListLayout,
    Button,
    SettlementsCallbackBlock,
    PageContainer,
    Content,
    SettlementDetails,
    SettlementInfrasctructure,
    SettlementLocation,
} from '@components/UI';
import { ItemHero, Section, WideSection, Infrastructure, SettlementMap } from '@components/Settlements';
import { CallbackForm } from '@components/Forms';
import { Summary } from '@components/Item';
import SettlementsItemLayout from '@components/UI/templates/SettlementsItemLayout';
import { fetchSettlementsItem, fetchProperty, fetchProperties } from '@store';
import { Breadcrumbs } from '@components';
import { dict, query } from '@utils';
import api from '@api';
import Catalog from '@components/Catalog';
import Gallery from '@components/Gallery';

const SettlementsItemPage = ({ id, dealType }) => {
    const { name, statistics: { totalProperties } = {}, location = {}, details = {}, images = [], description } =
        useSelector(state => state.settlements.items[id]) || {};

    const properties = useSelector(state => state.properties.items);

    const settlement = useSelector(state => state.settlements.items[Object.keys(state.settlements.items).pop()]);

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
                <Content>
                    <Catalog titleTag="h2" locationTitle={`в пос. ${name}`} dealType={dealType} single noMap />
                </Content>
                <SettlementDetails className="floating-border">
                    <Section title="О посёлке">
                        <p>{description.sattelite}</p>
                        <Gallery images={images} />
                    </Section>
                </SettlementDetails>
                <SettlementInfrasctructure className="floating-border">
                    <Section title="Инфраструктура">
                        <Infrastructure properties={properties} />
                    </Section>
                </SettlementInfrasctructure>
                <SettlementLocation className="floating-border">
                    <WideSection>
                        <SettlementMap settlement={settlement} />
                    </WideSection>
                </SettlementLocation>
                <article className="floating-border"></article>
            </SettlementsItemLayout>
        </PageContainer>
    );
};

SettlementsItemPage.getInitialProps = async ({ store, query: { id, orderBy, filter = '{}', path } }) => {
    const { dealType = 'sale', ...restFilter } = JSON.parse(filter);

    console.log(restFilter);

    await store.dispatch(fetchSettlementsItem(id));
    await store.dispatch(
        fetchProperties(
            0,
            query.convert({ filter: { ...restFilter, 'location.settlementId': id }, orderBy }, dealType),
            { dealType, ...restFilter },
            orderBy
        )
    );

    return { id, title: id };
};

export default SettlementsItemPage;
