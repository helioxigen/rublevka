import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Header, PageContainer, CatalogLayout, CardsGrid } from '@components/UI';
import { Card, Breadcrumbs, Filter, Sort } from '@components';
import { fetchProperties, changeSort } from '../store/properties/actions';
import { dict, app } from '@utils';

const CatalogPage = ({ dealType, list = [], sort, fetching, handleToggleSort }) => (
    <PageContainer>
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
        </CatalogLayout>
    </PageContainer>
);

CatalogPage.getInitialProps = async ({ store, req }) => {
    await store.dispatch(fetchProperties({ limit: 24, offset: 0 }, {}));

    const dealType = dict.translit(req.params.dealType);

    return { dealType };
};

// createSelector()

export default connect(
    state => ({
        list: state.properties.lists[state.properties.pagination.offset],
        sort: state.properties.sort,
        fetching: state.properties.fetching,
    }),
    dispatch => ({
        handleToggleSort: type => dispatch(changeSort(type)),
    })
)(CatalogPage);
