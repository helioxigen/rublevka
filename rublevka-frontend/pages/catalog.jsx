import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Header, PageContainer, CardsGrid, Toolbar, Content, IconButton, Icon } from '@components/UI';
import { Sort, Pagination, MapButton } from '@components/Catalog';
import { Card, Breadcrumbs, Filter } from '@components';
import { fetchProperties, changeOrderBy } from '@store';
import { dict, app, query, page as pageUtils, filter as filterUtils, media } from '@utils';
import { usePageTitle, useToggle } from '@hooks';

const CatalogPage = ({ className, dealType, kind, list = [], page, totalPages, fetching }) => {
    usePageTitle(dict.translateDealType(dealType).noun);

    const [isFilterOpen, toggleFilter] = useToggle(false);

    return (
        <PageContainer>
            <Content>
                <Head>
                    <meta name="og:image" content="http://image.com" />
                </Head>
                <Breadcrumbs className="breadcrumbs" dealType={dealType} />
                <main className={className}>
                    <header>
                        <Header.Catalog>
                            {dict.translateDealType(dealType).verb}{' '}
                            {(dict.translateKind(kind).noun || 'недвижимость').toLowerCase()} на{' '}
                            {app.ifDomain('Рублёвке', 'Риге')}
                        </Header.Catalog>
                        <Toolbar>
                            <Sort />
                            <MapButton />
                        </Toolbar>
                    </header>
                    <Filter className="filter" onClose={toggleFilter} isOpen={isFilterOpen} dealType={dealType} />
                    <CardsGrid fetching={fetching}>
                        {list.map(data => (
                            <Card key={data.id} dealType={dealType} data={data} />
                        ))}
                    </CardsGrid>
                    <Pagination count={totalPages} currentPage={page} />
                    <div className="floating-controls" data-hide={isFilterOpen}>
                        <IconButton onClick={() => pageUtils.goTo.map()} icon="placemark" floating red />
                        <IconButton onClick={toggleFilter} icon="settings" floating red>
                            Параметры
                        </IconButton>
                    </div>
                </main>
            </Content>
        </PageContainer>
    );
};

CatalogPage.getInitialProps = async ({
    store,
    query: { dealType: dealTypeTranslit, page = 1, filter: filterJson, orderBy, kind: kindT },
}) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);
    const kind = dict.translit.byWord(kindT);

    const filter = filterUtils.query.parse(filterJson, kind && { kind: [kind] });

    await store.dispatch(fetchProperties(page, query.convert({ filter, orderBy }, dealType), filter, orderBy));

    return { page, dealType, kind, title: dict.translateDealType(dealType).noun };
};

const ConnectedCatalogPage = connect(
    state => ({
        list: state.properties.list,
        orderBy: state.properties.orderBy,
        fetching: state.properties.fetching,
        page:
            (state.properties.pagination.offset + state.properties.pagination.limit) /
            state.properties.pagination.limit,
        totalPages: Math.floor(state.properties.pagination.total / state.properties.pagination.limit),
        totalItems: state.properties.pagination.total,
        user: state.user.currency,
    }),
    dispatch => ({
        handleToggleSort: type => dispatch(changeOrderBy(type)),
    })
)(CatalogPage);

export default styled(ConnectedCatalogPage)`
    display: grid;
    grid-template:
        'header'
        'cards'
        'pagination' 200px;

    grid-gap: 10px;

    ${media.mediaquery.tabletLandscape.at(
        css => css`
            grid-template:
                'header header header header'
                'filter cards cards cards'
                '. pagination pagination pagination' 200px /
                20% 1fr 1fr 1fr [end];
            width: auto;
        `
    )}

    .filter {
        padding-right: 24px;

        position: fixed;

        ${media.mediaquery.tabletLandscape.at(
            css => css`
                position: static;
            `
        )}
    }

    margin: 0 auto;

    > header {
        grid-area: header;

        ${media.desktop`
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            margin-bottom: 32px;
        `}

        ${media.upToTablet`
            h1 {
                display: none;
            }
        `}

        ${media.upToDesktop`
            h1, ${Toolbar} {
                margin-bottom: 1em;
            }
        `}
    }

    ${CardsGrid} {
        grid-area: cards;

        ${media.minDesktop`
            grid-column: 2 / span end;
        `}
    }

    .floating-controls {
        position: fixed;
        display: flex;
        justify-content: center;
        left: 0;
        right: 0;
        bottom: 32px;

        z-index: 1250;

        @keyframes appear{
            from {
                transform: translateY(200%);
            }
            to {
                transform: translateY(0);
            }
        }

        animation: appear 225ms cubic-bezier(0.250, 0.460, 0.450, 0.940);

        transition: transform 225ms cubic-bezier(0.250, 0.460, 0.450, 0.940);

        &[data-hide="true"] {
            transform: translateY(200%);
        }

        ${media.mediaquery.tabletLandscape.at(
            css => css`
                display: none;
            `
        )}


        .placemark-button{
            padding: 0.7em;
            font-size: 20px;
            flex: 0;
            margin-right: 8px;

            ${media.mediaquery.tablet.at(
                css => css`
                    display: none;
                `
            )}
        }

        .settings-button {
            line-height: 2.85;
            ${Icon} {
                font-size: 14px;
            }
            text-transform: initial;
        }
    }
`;
