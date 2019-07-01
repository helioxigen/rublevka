import React from 'react';
import { connect } from 'react-redux';
import { Header, PageContainer, CatalogLayout, CardsGrid } from '@components/UI';
import { Card } from '@components';
import { fetchProperties } from '../store/properties/actions';
import Breadcrumbs from '../components/Breadcrumbs';
import { dict, app } from '@utils';

const CatalogPage = ({ dealType, items = [] }) => (
    <PageContainer>
        <CatalogLayout>
            <Breadcrumbs dealType={dealType} />
            <Header.Catalog>
                {dict.translateDealType(dealType).verb} недвижимость на {app.ifDomain('Рублёвке', 'Риге')}
            </Header.Catalog>
            <CardsGrid>
                {items.map(data => (
                    <Card key={data.id} dealType={dealType} data={data} />
                ))}
            </CardsGrid>
        </CatalogLayout>
    </PageContainer>
);

CatalogPage.getInitialProps = async ({ store, req }) => {
    await store.dispatch(fetchProperties({ limit: 24 }, {}));

    const dealType = dict.translit(req.params.dealType);

    return { dealType };
};

export default connect(state => ({
    items: state.properties.items,
}))(CatalogPage);
