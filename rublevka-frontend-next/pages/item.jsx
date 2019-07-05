import React from 'react';
import { connect, useSelector } from 'react-redux';
import { PageContainer, Header, Price, ProfileCard, IconButton } from '@components/UI';
import { Breadcrumbs } from '@components';
import { dict, itemTitle } from '@utils';
import { fetchProperty } from '@store';
import ItemLayout from '@components/UI/templates/ItemLayout';

const CatalogItem = ({ dealType, id }) => {
    const { location, landDetails, specification, kind, location: { settlementId, settlementName } = {}, ...item } =
        useSelector(state => state.properties.items[id]) || {};

    const currency = useSelector(state => state.user.currency);

    const price = item[`${dealType}Offer`];

    // console.log(item);

    return (
        <PageContainer>
            <Breadcrumbs
                dealType={dealType}
                last={[
                    `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(settlementName)}_${settlementId}`,
                    settlementName,
                ]}
            />
            <ItemLayout>
                <article>
                    <Header.Item id={id}>
                        {itemTitle.generate(dealType, false, true, { location, landDetails, specification, kind })}
                    </Header.Item>
                </article>
                <aside>
                    <header>
                        <Price deal={price} dealType={dealType} />
                    </header>
                    <ProfileCard
                        avatar="/static/item/agent.jpg"
                        name="Елена Зверева"
                        subheader="Агент загородной недвижимости"
                    />
                    <footer>
                        <IconButton icon="favorite">В избранное</IconButton>
                    </footer>
                </aside>
            </ItemLayout>
        </PageContainer>
    );
};

CatalogItem.getInitialProps = async ({ store, query: { dealType: dealTypeTranslit, kind: kindTranslit, id } }) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);
    const kind = dict.translit.byWord(kindTranslit);

    await store.dispatch(fetchProperty(id));

    return { dealType, kind, id };
};

// connect();

export default CatalogItem;

// export default connect((state, { id }) => ({
//     item: state.properties.items[id] || {},
// }))(CatalogItem);
