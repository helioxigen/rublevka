import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header, PageContainer, CatalogLayout, CardsGrid } from '@components/UI';
import { Card, Breadcrumbs, Filter, Sort, Pagination } from '@components';
import { fetchProperties, changeOrderBy } from '@store';
import { dict, app, filter as filterUtils } from '@utils';

const CatalogPage = ({
    dealType,
    list = [],
    page,
    user,
    totalPages,
    totalItems,
    orderBy,
    fetching,
    handleToggleSort,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const parsedFilter = JSON.parse(router.query.filter || '{}');
        const { orderBy: orderByQuery } = router.query;

        const filterQuery = filterUtils.query.createFilterQuery(dealType, parsedFilter);
        const orderQuery = filterUtils.query.orderToQuery(orderByQuery, dealType, user.currency);

        dispatch(
            fetchProperties(router.query.page || page, { ...filterQuery, ...orderQuery }, parsedFilter, orderByQuery)
        );
    }, [router.query]);

    return (
        <PageContainer>
            <Head>
                <meta name="og:image" content="http://image.com" />
            </Head>
            <Breadcrumbs dealType={dealType} />
            <CatalogLayout>
                <header>
                    <Header.Catalog>
                        {dict.translateDealType(dealType).verb} недвижимость на {app.ifDomain('Рублёвке', 'Риге')}
                    </Header.Catalog>
                    <Sort total={totalItems} value={orderBy} onChange={handleToggleSort} />
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
};

CatalogPage.getInitialProps = async ({
    store,
    query: { dealType: dealTypeTranslit, page = 1, filter = '', orderBy },
}) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);

    const parsedFilter = JSON.parse(filter || '{}');

    const filterQuery = filterUtils.query.createFilterQuery(dealType, parsedFilter);
    const orderQuery = filterUtils.query.orderToQuery(orderBy, dealType);

    await store.dispatch(fetchProperties(page, { ...filterQuery, ...orderQuery }, parsedFilter, orderBy));

    return { dealType };
};

// createSelector()

export default connect(
    state => ({
        list: state.properties.lists[state.properties.pagination.offset],
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
