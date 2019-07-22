import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Header, PageContainer, CardsGrid, Toolbar, Content } from '@components/UI';
import { Sort, Pagination, MapButton, FloatingControls } from '@components/Catalog';
import { Card, Breadcrumbs, Filter } from '@components';
import { fetchProperties, changeOrderBy } from '@store';
import { dict, app, query, filter as filterUtils, media } from '@utils';
import { useToggle } from '@hooks';

const CatalogPage = ({ className, dealType, kind, list = [], page, totalPages, fetching }) => {
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
                    <FloatingControls />
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

    ${media.desktop.at(
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

        ${media.desktop.at(
            css => css`
                position: static;
            `
        )}
    }

    margin: 0 auto;

    > header {
        grid-area: header;

        ${media.desktopL.at(
            css => css`
                display: flex;
                justify-content: space-between;
                align-items: flex-start;

                margin-bottom: 32px;
            `
        )}

        ${media.tablet.to(
            css => css`
                h1 {
                    display: none;
                }
            `
        )}

        ${media.desktopL.to(
            css => css`
                h1,
                ${Toolbar} {
                    margin-bottom: 1em;
                }
            `
        )}
    }

    ${CardsGrid} {
        grid-area: cards;

        ${media.desktop.at(
            css => css`
                grid-column: 2 / span end;
            `
        )}

    }
`;
