import React from 'react';
import { PageContainer, Content } from '@components/UI';
import Catalog from '@components/Catalog';
import { Breadcrumbs } from '@components';
import { fetchProperties } from '@store';
import { dict, query, filter as filterUtils, seo } from '@utils';

const CatalogPage = ({ dealType, kind }) => {
    return (
        <PageContainer>
            <Content>
                <Breadcrumbs className="breadcrumbs" dealType={dealType} />
                <Catalog dealType={dealType} kind={kind} />
            </Content>
        </PageContainer>
    );
};

CatalogPage.getInitialProps = async ({
    store,
    query: { page = 1, filter: filterJson, orderBy },
    params: { dealType, kind },
    asPath,
}) => {
    const filter = filterUtils.query.parse(filterJson, kind && { kind: [kind] });

    await store.dispatch(
        fetchProperties(dealType, page, query.convert({ filter, orderBy }, dealType), filter, orderBy)
    );

    return {
        page,
        dealType,
        kind,
        filter,
        orderBy,
        title: dict.translateDealType(dealType).noun,
        meta: seo.list(dealType, kind, asPath, page),
        menuEntry: dealType,
        prevPage: {
            href: '/',
            as: '/',
        },
    };
};

export default CatalogPage;
