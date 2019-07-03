import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Header, PageContainer, CatalogLayout, CardsGrid } from '@components/UI';
import { Card, Breadcrumbs, Filter, Sort, Pagination } from '@components';
import { fetchProperties, changeSort } from '../store/properties/actions';
import { dict, app } from '@utils';

const CatalogPage = ({ dealType, list = [], page, totalPages, sort, fetching, handleToggleSort }) => (
    <PageContainer>
        <Head>
            <meta name="og:image" content="http://image.com" />
        </Head>
        <CatalogLayout>
            <Breadcrumbs dealType={dealType} />
            <header>
                <Header.Catalog>
                    {dict.translateDealType(dealType).verb} недвижимость на {app.ifDomain('Рублёвке', 'Риге')}
                </Header.Catalog>
                <Sort value={sort} onChange={handleToggleSort} />
            </header>
            <Filter dealType={dealType} />
            <CardsGrid fetching={fetching}>
                {list.map(data => (
                    <Card key={data.id} dealType={dealType} data={data} />
                ))}
            </CardsGrid>
            <Pagination count={totalPages} currentPage={page} />
        </CatalogLayout>
    </PageContainer>
);

CatalogPage.getInitialProps = async ({
    store,
    req: {
        params,
        query: { page = 1, filter = {} },
    },
}) => {
    const limit = 24;

    await store.dispatch(fetchProperties({ limit, offset: page * limit - limit }, filter));

    const dealType = dict.translit(params.dealType);

    return { dealType };
};

// createSelector()

export default connect(
    state => ({
        list: state.properties.lists[state.properties.pagination.offset],
        sort: state.properties.sort,
        fetching: state.properties.fetching,
        page:
            (state.properties.pagination.offset + state.properties.pagination.limit) /
            state.properties.pagination.limit,
        totalPages: Math.floor(state.properties.pagination.total / state.properties.pagination.limit),
    }),
    dispatch => ({
        handleToggleSort: type => dispatch(changeSort(type)),
    })
)(CatalogPage);
