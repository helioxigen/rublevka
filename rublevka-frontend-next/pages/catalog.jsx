import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Header, PageContainer, CatalogLayout, CardsGrid, Toolbar, Content } from '@components/UI';
import { Sort, Pagination, MapButton } from '@components/Catalog';
import { Card, Breadcrumbs, Filter } from '@components';
import { fetchProperties, changeOrderBy } from '@store';
import { dict, app, query, filter as filterUtils } from '@utils';

const CatalogPage = ({ dealType, list = [], page, totalPages, fetching }) => (
    <PageContainer>
        <Content>
            <Head>
                <meta name="og:image" content="http://image.com" />
            </Head>
            <Breadcrumbs dealType={dealType} />
            <CatalogLayout>
                <header>
                    <Header.Catalog>
                        {dict.translateDealType(dealType).verb} недвижимость на {app.ifDomain('Рублёвке', 'Риге')}
                    </Header.Catalog>
                    <Toolbar>
                        <Sort />
                        <MapButton />
                    </Toolbar>
                </header>
                <Filter dealType={dealType} />
                <CardsGrid fetching={fetching}>
                    {list.map(data => (
                        <Card key={data.id} dealType={dealType} data={data} />
                    ))}
                </CardsGrid>
                <Pagination count={totalPages} currentPage={page} />
            </CatalogLayout>
        </Content>
    </PageContainer>
);

CatalogPage.getInitialProps = async ({
    store,
    query: { dealType: dealTypeTranslit, page = 1, filter: filterJson, orderBy, kind },
}) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);

    const filter = filterUtils.query.parse(filterJson, kind && { kind: [dict.translit.byWord(kind)] });

    await store.dispatch(fetchProperties(page, query.convert({ filter, orderBy }, dealType), filter, orderBy));

    return { page, dealType };
};

export default connect(
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
