import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header, PageContainer, CatalogLayout, CardsGrid } from '@components/UI';
import { Card, Breadcrumbs, Filter, Sort, Pagination } from '@components';
import { fetchProperties, changeSort } from '../store/properties/actions';
import { dict, app, filter as filterUtils } from '@utils';

const CatalogPage = ({ dealType, list = [], page, totalPages, sort, fetching, handleToggleSort, pagination }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const parsedFilter = JSON.parse(router.query.filter || '{}');

        const filterQuery = filterUtils.query.createFilterQuery(dealType, parsedFilter);

        dispatch(fetchProperties(router.query.page || page, filterQuery, parsedFilter));
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
};

CatalogPage.getInitialProps = async ({ store, query: { dealType: dealTypeTranslit, page = 1, filter = '' } }) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);

    const parsedFilter = JSON.parse(filter || '{}');

    const filterQuery = filterUtils.query.createFilterQuery(dealType, parsedFilter);

    await store.dispatch(fetchProperties(page, filterQuery, parsedFilter));

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
