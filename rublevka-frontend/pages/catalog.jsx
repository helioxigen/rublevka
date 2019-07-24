import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { PageContainer, Content } from '@components/UI';
import Catalog from '@components/Catalog';
import { Breadcrumbs } from '@components';
import { fetchProperties } from '@store';
import { dict, query, filter as filterUtils } from '@utils';

const CatalogPage = ({ dealType, kind }) => {
    const list = useSelector(state => state.properties.list);

    return (
        <PageContainer>
            <Content>
                <Head>
                    <meta name="og:image" content="http://image.com" />
                </Head>
                <Breadcrumbs className="breadcrumbs" dealType={dealType} />
                <Catalog dealType={dealType} kind={kind} items={list} />
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

export default CatalogPage;
