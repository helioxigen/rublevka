import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PageContainer, Content } from '@components/UI';
import Catalog from '@components/Catalog';
import { Breadcrumbs } from '@components';
import { fetchProperties } from '@store';
import { dict, query, filter as filterUtils, seo } from '@utils';

const CatalogPage = ({ dealType, kind, page, filter, orderBy }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProperties(dealType, page, query.convert({ filter, orderBy }, dealType), filter, orderBy));
    }, [page, filter, orderBy, dealType]);

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
    query: { page = 1, filter: filterJson, orderBy },
    params: { dealType, kind },
    asPath,
}) => {
    const filter = filterUtils.query.parse(filterJson, kind && { kind: [kind] });

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
