import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PageContainer, Header, Price, ProfileCard, ItemLayout, FavoriteButton, Content } from '@components/UI';
import { Category, Details, Summary, Section, Layouts, Location } from '@components/Item';
import { CallbackForm } from '@components/Forms';
import { ContactToolbar } from '@components/Toolbars';
import { Breadcrumbs, Gallery, CardSummary } from '@components';
import { dict, itemTitle, format } from '@utils';
import { fetchProperty } from '@store';

// const Gallery = dynamic(() => import(`@components/Catalog/Gallery`), { ssr: false });

const CatalogItem = ({ dealType, kind, id }) => {
    const {
        location = {},
        landDetails = {},
        specification = {},
        communication = {},
        location: { settlementId, settlementName } = {},
        layoutImages = [],
        images = [],
        ...item
    } = useSelector(state => state.properties.items[id]) || {};

    const currency = useSelector(state => state.user.currency);

    const price = item[`${dealType}Offer`] || {};

    const summary = useMemo(
        () => [
            landDetails.area && ['Участок', `${landDetails.area} сот`],
            specification.area && ['Дом', `${specification.area} м²`],
            specification.bedrooms && [
                format.titleByNumber(specification.bedrooms, ['Спальня', 'Спальни', 'Спален'], true),
                specification.bedrooms,
            ],
        ],
        [id, dealType]
    );

    // console.log(item);

    return (
        <PageContainer>
            <Content compact>
                <Breadcrumbs
                    className="breadcrumbs"
                    dealType={dealType}
                    last={[
                        `/settlements.item?id=${settlementId}`,
                        `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(settlementName)}_${settlementId}`,
                        settlementName,
                    ]}
                />
                <ItemLayout>
                    <article>
                        <Header.Item id={id}>
                            {itemTitle.generate(dealType, false, true, { location, landDetails, specification, kind })}
                        </Header.Item>
                        <Gallery
                            id={id}
                            dealType={dealType}
                            layoutImages={layoutImages}
                            images={images.filter(i => i.isPublic)}
                        />
                        <Category className="main-cat">
                            <Price
                                showSubheader
                                kind={kind}
                                landDetails={landDetails}
                                deal={price}
                                dealType={dealType}
                            />
                            <Summary values={summary} />
                        </Category>
                        <Category>
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
                        </Category>
                        {!isEmpty(specification.layouts) && (
                            <Category>
                                <Section title={dict.translateKind(kind).noun}>
                                    <Layouts layouts={specification.layouts} />
                                </Section>
                            </Category>
                        )}
                        {location.longitude && location.latitude && (
                            <Category>
                                <Section title="Объект на карте">
                                    <Location longitude={location.longitude} latitude={location.latitude} />
                                </Section>
                            </Category>
                        )}
                    </article>
                    <aside>
                        <header>
                            <Price deal={price} dealType={dealType} />
                        </header>
                        <CallbackForm
                            header={
                                <ProfileCard
                                    avatar="/static/item/agent.jpg"
                                    name="Елена Зверева"
                                    subheader="Агент загородной недвижимости"
                                />
                            }
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
                            fullWidth
                            submitLabel="Забронировать просмотр"
                            defaultComment={`${dict.translateDealType(dealType)} ${
                                dict.translateKind(kind).genitive
                            } ID:${id}`}
                        />
                        <footer>
                            <FavoriteButton red id={item.id} dealType={dealType}>
                                {favorite => (favorite ? 'В избранном' : 'В избранное')}
                            </FavoriteButton>
                        </footer>
                    </aside>
                    <ContactToolbar />
                </ItemLayout>
            </Content>
        </PageContainer>
    );
};

CatalogItem.getInitialProps = async ({ store, query: { dealType: dealTypeTranslit, kind: kindTranslit, id } }) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);
    const kind = dict.translit.byWord(kindTranslit);

    await store.dispatch(fetchProperty(id));

    return { dealType, kind, id, title: `${dict.translateKind(kind).noun} №${id}` };
};

// connect();

export default CatalogItem;

// export default connect((state, { id }) => ({
//     item: state.properties.items[id] || {},
// }))(CatalogItem);
