import React from 'react';
import { connect } from 'react-redux';
// import { fetchProperties } from '../store/properties';
// import api from '../api';
import { Header, PageContainer, CatalogLayout } from '@components/UI';
import { fetchProperties } from '../store/properties';
import Breadcrumbs from '../components/Breadcrumbs';
import { dict, app } from '@utils';
// import { PROPERTIES_FETCHED } from '@store/properties';

const CatalogPage = ({ dealType, list }) => (
    <PageContainer>
        <CatalogLayout>
            <Breadcrumbs dealType={dealType} />
            <Header.Catalog>
                {dict.translateDealType(dealType).verb} недвижимость на {app.ifDomain('Рублёвке', 'Риге')}
            </Header.Catalog>
        </CatalogLayout>
    </PageContainer>
);

CatalogPage.getInitialProps = async ({ store, req }) => {
    await store.dispatch(fetchProperties({ limit: 24 }, {}));

    const dealType = dict.translit(req.params.dealType);

    return { dealType };
};

export default connect(state => ({
    list: state.properties.list,
}))(CatalogPage);
