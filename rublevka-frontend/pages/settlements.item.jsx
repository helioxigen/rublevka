import React from 'react';
import { useSelector } from 'react-redux';

import { Element, Link as ScrollLink } from 'react-scroll';

import { Button, PageContainer, Content, SettlementDetails } from '@components/UI';
import { ItemHero, Section, Infrastructure, SettlementMap } from '@components/Settlements';
import { CallbackForm } from '@components/Forms';
import Catalog from '@components/Catalog';
import SettlementsItemLayout from '@components/UI/templates/SettlementsItemLayout';
import { NextSeo } from 'next-seo';
import { fetchSettlementsItem, fetchSettlementProperties, setFilter } from '@store';
import { Breadcrumbs } from '@components';
import { dict, query, seo, cdn, tools } from '@utils';

const SettlementsItemPage = ({ id, dealType, isOnlyType, kind }) => {
    const { name, location = {}, images = [], description: desc } =
        useSelector(state => state.settlements.items[id]) || {};

    const properties = useSelector(state => state.properties.settlementLists[dealType]);

    const { title, description } = seo.settlements.item(dealType, kind, name, location.routeName);

    return (
        <PageContainer noMargin fullWidth>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    title,
                    description,
                    images: images.map(({ id: imageId }) => ({
                        url: cdn.get.full(imageId),
                        width: 1024,
                        height: 600,
                    })),
                }}
            />
            <SettlementsItemLayout>
                <ItemHero>
                    <Breadcrumbs
                        className="breadcrumbs"
                        second={['/settlements.list', '/zagorodnaya/kottedzhnye-poselki', 'Посёлки']}
                        last={[
                            `/settlements.item?id=${id}`,
                            `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
                            name,
                        ]}
                    />
                    <div className="title">
                        <h1>
                            <span className="desktop-only">Посёлок</span> {name}
                        </h1>
                        <ScrollLink to="details" smooth offset={-100}>
                            <Button red>
                                <span className="phone-only">Информация</span> о посёлке
                            </Button>
                        </ScrollLink>
                    </div>
                    <CallbackForm
                        className="callback-form"
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
                    <Catalog
                        shortFilter
                        prevPage={JSON.stringify({
                            href: `/settlements.item?id=${id}`,
                            as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
                        })}
                        titleTag="h2"
                        total
                        locationTitle={`в пос. ${name}`}
                        dealType={dealType}
                        single={!isOnlyType}
                        itemsExplicit={properties}
                        totalItems={properties.length}
                        noMap
                    />
                </Content>
                <Element name="details">
                    <SettlementDetails className="floating-border details">
                        {desc.sattelite && (
                            <Section title="О посёлке">
                                <p>{desc.sattelite}</p>
                                {/* <Gallery images={images} /> */}
                            </Section>
                        )}
                        <Infrastructure properties={properties} />
                        <Section wide>
                            <SettlementMap name={name} location={location} />
                        </Section>
                    </SettlementDetails>
                </Element>
            </SettlementsItemLayout>
        </PageContainer>
    );
};

SettlementsItemPage.getInitialProps = async ({ store, query: { id, orderBy, filter = '{}' } }) => {
    const { dealType = 'sale', ...restFilter } = JSON.parse(filter) || {};

    const fetchByDeal = dealT =>
        store.dispatch(
            fetchSettlementProperties(
                dealT,
                0,
                query.convert({ filter: { ...restFilter, 'location.settlementId': id }, orderBy }, dealT),
                { dealT, ...restFilter },
                orderBy
            )
        );

    await store.dispatch(fetchSettlementsItem(id));

    await fetchByDeal('sale');
    await fetchByDeal('rent');

    const {
        properties: { settlementLists, filter: propertiesFilter },
    } = store.getState();

    if (!propertiesFilter.dealType) {
        await store.dispatch(setFilter({ dealType }));
    }

    const dealTypes = Object.keys(tools.cleanObject(settlementLists));

    const isOnlyType = dealTypes.length === 1;

    return {
        id,
        title: `О посёлке`,
        menuEntry: 'settlements',
        kind: restFilter.kind,
        isOnlyType,
        dealType: isOnlyType ? dealTypes[0] : dealType,
        prevPage: {
            href: '/settlements.list',
            as: '/zagorodnaya/kottedzhnye-poselki',
        },
    };
};

export default SettlementsItemPage;
