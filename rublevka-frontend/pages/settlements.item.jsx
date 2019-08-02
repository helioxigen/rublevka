import React from 'react';
import { useSelector } from 'react-redux';

import { Element, Link as ScrollLink } from 'react-scroll';

import { Button, PageContainer, Content, SettlementDetails } from '@components/UI';
import { ItemHero, Section, Infrastructure, SettlementMap } from '@components/Settlements';
import { CallbackForm } from '@components/Forms';
import Catalog from '@components/Catalog';
import SettlementsItemLayout from '@components/UI/templates/SettlementsItemLayout';
import { NextSeo } from 'next-seo';
import { fetchSettlementsItem, fetchProperties } from '@store';
import { Breadcrumbs } from '@components';
import { dict, query, seo, cdn } from '@utils';

const SettlementsItemPage = ({ id, dealType, kind }) => {
    const { name, location = {}, images = [], description: desc } =
        useSelector(state => state.settlements.items[id]) || {};

    const properties = useSelector(state => state.properties.items);

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
                            `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}`,
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
                        titleTag="h2"
                        locationTitle={`в пос. ${name}`}
                        dealType={dealType}
                        single
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

    await store.dispatch(fetchSettlementsItem(id));
    await store.dispatch(
        fetchProperties(
            0,
            query.convert({ filter: { ...restFilter, 'location.settlementId': id }, orderBy }, dealType),
            { dealType, ...restFilter },
            orderBy
        )
    );

    return { id, title: `О посёлке`, menuEntry: 'settlements', kind: restFilter.kind };
};

export default SettlementsItemPage;
