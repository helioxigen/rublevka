import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { MapCatalogLayout } from '@components/UI';
import { FilterSection, ViewCards, LayoutMap } from '@components/MapCatalog';
import { changeOrderBy, fetchMapPropertiesSubset, setDisplayedItemsIds, setFilter } from '@store';
import { dict, query as queryUtils, filter as filterUtils } from '@utils';
import { useRecalcWidth, useToggle } from '@hooks';
import { Navbar, Footer } from '@components';

const HideNav = createGlobalStyle`
    ${Navbar} {
        transform: translateY(-100%);
        transition: 0.4s;
        height: 0;
    }

    ${Footer} {
        display: none;
    }
`;

const repeatBy = async (extractStepsFn, execOnStep) => {
    const zeroRes = await execOnStep(0);

    const stepsCount = extractStepsFn(zeroRes) - 1;

    if (stepsCount === -1) return;

    [...new Array(stepsCount)].forEach((_, idx) => setTimeout(() => execOnStep(idx + 1, stepsCount), 1000));
};

const MapCatalogPage = ({ displayedIds, clusterId, mapItems, totalItems, dispatch }) => {
    const router = useRouter();
    const dealType = dict.translit.byWord(router.query.dealType);
    const filter = filterUtils.query.parse(
        router.query.filter,
        router.query.kind && { kind: [dict.translit.byWord(router.query.kind)] }
    );

    const [isCardsListOpen, toggleCardsList] = useToggle(false);
    const [asideRef, triggerCalc, asideWidth] = useRecalcWidth();

    const [mapZoomDefault] = useState(true);

    const displayedItems = displayedIds.map(id => mapItems.find(i => i.id === id));

    const { location: { settlementName } = {} } = displayedItems[0] || {};

    const resetIds = () => dispatch(setDisplayedItemsIds([]));

    useEffect(() => {
        triggerCalc();
    }, [isCardsListOpen]);

    useEffect(() => {
        if (displayedIds.length > 0) {
            resetIds();
        }
        dispatch(setFilter(filter));
        // setDefaultZoom(true);
    }, [router.query]);

    useEffect(() => {
        repeatBy(
            action => Math.ceil(action.response.pagination.total / action.response.pagination.limit),
            (step, count) => dispatch(fetchMapPropertiesSubset(queryUtils.convert({ filter }, dealType), step, count))
        );
    }, [router.query]);

    return (
        <MapCatalogLayout>
            <HideNav />
            <aside ref={asideRef}>
                <FilterSection
                    settlementName={settlementName}
                    itemsCount={displayedIds.length}
                    onResetItems={resetIds}
                    totalItems={totalItems}
                />
                {displayedIds.length !== 0 && (
                    <ViewCards
                        clusterId={clusterId}
                        isOpen={isCardsListOpen}
                        items={displayedItems}
                        onToggle={toggleCardsList}
                    />
                )}
            </aside>
            <LayoutMap
                mapMarginLeft={asideWidth}
                clusterId={clusterId}
                isDefaultZoom={mapZoomDefault}
                items={mapItems}
                openCardsList={() => !isCardsListOpen && toggleCardsList()}
            />
        </MapCatalogLayout>
    );
};

MapCatalogPage.getInitialProps = ({ query: { dealType, kind } }) => ({
    prevPage: {
        href: `/catalog?dealType=${dealType}&kind=${kind}`,
        as: `/zagorodnaya/${dealType}/${kind}`,
    },
});

export default connect(
    state => ({
        list: state.map.list,
        fetching: state.map.fetching,
        totalItems: state.map.total,
        user: state.user.currency,
        displayedIds: state.map.displayedIds,
        clusterId: state.map.clusterId,
        mapItems: state.map.list,
    }),
    dispatch => ({
        dispatch,
        handleToggleSort: type => dispatch(changeOrderBy(type)),
    })
)(MapCatalogPage);
