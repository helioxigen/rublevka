import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PageContainer, Header, ProfileCard, FavoriteButton, Content, IconButton, MultiPrice } from '@components/UI';
import { Category, Details, Summary, Section, Layouts, Location, Counter, FullScreenGallery } from '@components/Item';
import { CallbackForm } from '@components/Forms';
import { ContactToolbar } from '@components/Toolbars';
import Gallery from '@components/Gallery';
import { Breadcrumbs } from '@components';
import { dict, itemTitle, format, media } from '@utils';
import { fetchProperty } from '@store';

// const Gallery = dynamic(() => import(`@components/Catalog/Gallery`), { ssr: false });

const CatalogItem = ({ className, dealType, kind, id }) => {
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

    return (
        <PageContainer>
            <Content compact item>
                <Breadcrumbs
                    className="breadcrumbs"
                    dealType={dealType}
                    last={[
                        `/settlements.item?id=${settlementId}`,
                        `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(settlementName)}_${settlementId}`,
                        settlementName,
                    ]}
                />
                <main className={className}>
                    <article>
                        <Header.Item id={id}>
                            {itemTitle.generate(dealType, false, true, { location, landDetails, specification, kind })}
                        </Header.Item>
                        <FullScreenGallery
                            id={id}
                            images={images.filter(i => i.isPublic)}
                            specification={specification}
                        >
                            {onClick => (
                                <Gallery
                                    layoutImages={layoutImages.filter(i => i.isPublic)}
                                    images={images.filter(i => i.isPublic)}
                                >
                                    <IconButton onClick={onClick} icon="expand" />
                                    <Counter overall={images.length} />
                                    <FavoriteButton className="favorite-button" id={id} dealType={dealType} />
                                </Gallery>
                            )}
                        </FullScreenGallery>
                        <Category className="main-cat">
                            <MultiPrice
                                className="article-price"
                                kind={kind}
                                landDetails={landDetails}
                                price={price}
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
                            <MultiPrice kind={kind} landDetails={landDetails} price={price} dealType={dealType} />
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
                            defaultComment={`[Просмотр] ${dict.translateDealType(dealType)} ${
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
                </main>
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

// CatalogItem.linkTemplate = ({ id, name }) => {
//     '';
// };

// connect();

export default styled(CatalogItem)`
    .expand-button {
        position: absolute;
        z-index: 5;
        right: 0px;
        top: 0;
        background: none;
        font-size: 18px;

        width: 56px;

        transition: opacity 225ms;
        opacity: 0;
        box-shadow: none;
    }

    .favorite-button {
        position: absolute;
        top: 5px;
        right: 0;

        ${media.desktop.at(
            css => css`
                display: none;
            `
        )}
    }

    span.id {
        margin: 0;
        padding: 5px;
        position: absolute;
        top: 20px;
        left: 15px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;

        line-height: 18px;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.535714px;

        color: #ffffff;

        text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);

        z-index: 200;

        ${media.desktop.at(
            css => css`
                display: none;
            `
        )}
    }

    ${Counter} {
        position: absolute;
        bottom: 20px;
        right: 15px;

        ${media.tablet.at(
            css => css`
                right: unset;
                left: 15px;
            `
        )}
    }

    ${ContactToolbar} {
        padding: 8px 15px;
        border: 1px solid #eeeeee;
        box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.05);

        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;

        ${media.tablet.at(
            css => css`
                display: none;
            `
        )}
    }

    ${media.desktop.at(
        css => css`
            display: grid;
            grid-template-columns: minmax(300px, 740px) 360px;
            grid-gap: 30px;

            > article,
            > aside {
                background: #ffffff;
                border: 1px solid #eeeeee;
                box-sizing: border-box;
                border-radius: 4px;
            }
        `
    )}

    > article {
        margin-top: 18px;

        ${media.desktop.at(
            css => css`
                max-width: 740px;
                margin-top: 0;
                padding: 24px 20px;
            `
        )}

        ${Header.Item} {
            margin-bottom: 18px;
            padding: 0 15px;

            ${media.tablet.at(
                css => css`
                    padding: 0;
                `
            )}

            ${media.desktop.at(
                css => css`
                    margin-bottom: 20px;
                `
            )}
        }

        ${Gallery} {
            margin: 0;
        }

        ${media.desktop.at(
            css => css`
                ${Gallery} {
                    margin: 20px 0;
                }
            `
        )}

        ${Section} {
            margin: 12px 0 16px;
            ${media.desktop.at(
                css => css`
                    margin: 20px 0 32px;
                `
            )}

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    > aside {
        align-self: flex-start;
        display: none;

        ${media.desktop.at(
            css => css`
                display: block;
            `
        )}

        > *:not(header) {
            padding: 24px 20px;
        }

        > header {
            display: flex;
            flex-direction: column;
            justify-content: center;

            font-size: 24px;
            font-weight: 500;

            border-bottom: 1px solid #eeeeee;
        }

        > footer {
            border-top: 1px solid #eeeeee;
            padding: 0;

            ${FavoriteButton} {
                padding: 24px 0;

                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;

                height: 66px;
                padding: 0;

                color: #aaa;

                font-size: 15px;

                .favorite-icon {
                    margin-right: 10px;
                }

                .text {
                    width: 95px;
                }
            }
        }
    }
`;

// export default connect((state, { id }) => ({
//     item: state.properties.items[id] || {},
// }))(CatalogItem);
