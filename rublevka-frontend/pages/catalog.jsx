import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Header, PageContainer, CatalogLayout, CardsGrid, Toolbar, Content, IconButton } from '@components/UI';
import { Sort, Pagination, MapButton } from '@components/Catalog';
import { Card, Breadcrumbs, Filter } from '@components';
import { fetchProperties, changeOrderBy } from '@store';
import { dict, app, query, page as pageUtils, filter as filterUtils } from '@utils';
import { usePageTitle, useToggle } from '@hooks';

const CatalogPage = ({ dealType, kind, list = [], page, totalPages, fetching }) => {
    usePageTitle(dict.translateDealType(dealType).noun);

    const [isFilterOpen, toggleFilter] = useToggle(false);

    return (
        <PageContainer>
            <Content>
                <Head>
                    <meta name="og:image" content="http://image.com" />
                </Head>
                <Breadcrumbs dealType={dealType} />
                <CatalogLayout>
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
                    <Filter onClose={toggleFilter} isOpen={isFilterOpen} dealType={dealType} />
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
                </CatalogLayout>
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
