import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Header, PageContainer, CatalogLayout, CardsGrid } from '@components/UI';
import { Card, Breadcrumbs, Filter } from '@components';
import { fetchProperties } from '../store/properties/actions';
import { dict, app } from '@utils';

const CatalogPage = ({ dealType, list = [] }) => (
    <PageContainer>
        <CatalogLayout>
            <Breadcrumbs dealType={dealType} />
            <Header.Catalog>
                {dict.translateDealType(dealType).verb} недвижимость на {app.ifDomain('Рублёвке', 'Риге')}
            </Header.Catalog>
            <Filter />
            <CardsGrid>
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

export default connect(state => ({
    list: state.properties.lists[state.properties.pagination.offset],
}))(CatalogPage);
