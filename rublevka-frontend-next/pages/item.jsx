import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PageContainer, Header, Price, ProfileCard, IconButton, ItemLayout } from '@components/UI';
import { Layout, Details, Summary, Section, Layouts, Location } from '@components/Item';
import { Breadcrumbs, Gallery } from '@components';
import { dict, itemTitle, format } from '@utils';
import { fetchProperty } from '@store';

const CatalogItem = ({ dealType, kind, id }) => {
    const {
        location,
        landDetails,
        specification,
        communication,
        location: { settlementId, settlementName } = {},
        layoutImages = [],
        images = [],
        ...item
    } = useSelector(state => state.properties.items[id]) || {};

    const currency = useSelector(state => state.user.currency);

    const price = item[`${dealType}Offer`] || {};

    // console.log(item);

    return (
        <PageContainer item>
            <Breadcrumbs
                dealType={dealType}
                last={[
                    `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(settlementName)}_${settlementId}`,
                    settlementName,
                ]}
            />
            <ItemLayout>
                <article>
                    <Header.Item id={id}>
                        {itemTitle.generate(dealType, false, true, { location, landDetails, specification, kind })}
                    </Header.Item>
                    <Gallery layoutImages={layoutImages} images={images.filter(i => i.isPublic)} />
                    <Summary
                        values={[
                            landDetails.area && ['Участок', `${landDetails.area} сот`],
                            specification.area && ['Дом', `${specification.area} м²`],
                            specification.bedrooms && [
                                format.titleByNumber(specification.bedrooms, ['Спальня', 'Спальни', 'Спален'], true),
                                specification.bedrooms,
                            ],
                        ]}
                    />
                    <Section title="Общая информация">
                        <Details
                            values={[
                                ['Площадь участка', landDetails.area, 'сот.'],
                                ['Площадь дома', specification.area, 'м²'],
                                ['Тип дома', dict.details.get(specification.wallMaterial)],
                                ['Ремонт', dict.details.get(specification.renovate)],
                            ]}
                        />
                    </Section>
                    {!isEmpty(communication) && (
                        <Section title="Коммуникации">
                            <Details
                                values={[
                                    ['Тип газа', dict.details.get(communication.gasSupply)],
                                    ['Электричество', communication.powerSupply, 'кВт'],
                                    ['Канализация', dict.details.get(communication.sewerageSupply, 'ая')],
                                    ['Источник воды', dict.details.get(communication.waterSupply, 'ое')],
                                ]}
                            />
                        </Section>
                    )}
                    {!isEmpty(specification.layouts) && (
                        <Section title={dict.translateKind(kind).noun}>
                            <Layouts layouts={specification.layouts} />
                        </Section>
                    )}
                    {location.longitude && location.latitude && (
                        <Section title="Объект на карте">
                            <Location longitude={location.longitude} latitude={location.latitude} />
                        </Section>
                    )}
                </article>
                <aside>
                    <header>
                        <Price deal={price} dealType={dealType} />
                    </header>
                    <ProfileCard
                        avatar="/static/item/agent.jpg"
                        name="Елена Зверева"
                        subheader="Агент загородной недвижимости"
                    />
                    <footer>
                        <IconButton icon="favorite">В избранное</IconButton>
                    </footer>
                </aside>
            </ItemLayout>
        </PageContainer>
    );
};

CatalogItem.getInitialProps = async ({ store, query: { dealType: dealTypeTranslit, kind: kindTranslit, id } }) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);
    const kind = dict.translit.byWord(kindTranslit);

    await store.dispatch(fetchProperty(id));

    return { dealType, kind, id };
};

// connect();

export default CatalogItem;

// export default connect((state, { id }) => ({
//     item: state.properties.items[id] || {},
// }))(CatalogItem);
