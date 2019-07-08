import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MapCatalogLayout } from '@components/UI';
import { FilterSection, ViewCards, LayoutMap } from '@components/MapCatalog';
import { changeOrderBy, fetchMapPropertiesSubset, setDisplayedItemsIds, setFilter } from '@store';
import { dict, query as queryUtils, filter as filterUtils } from '@utils';
import { useToggle, useRecalcWidth } from '@hooks';
import { Navbar } from '@components';

const HideNav = createGlobalStyle`
    ${Navbar} {
        transform: translateY(-100%);
        transition: 0.4s;
    }
`;

const repeatBy = async (extractStepsFn, execOnStep) => {
    const zeroRes = await execOnStep(0);

    const stepsCount = extractStepsFn(zeroRes) - 1;

    [...new Array(stepsCount)].forEach((_, idx) => setTimeout(() => execOnStep(idx + 1, stepsCount), 1000));
};

const MapCatalogPage = ({ displayedIds, clusterId, mapItems, dispatch }) => {
    const router = useRouter();
    const dealType = dict.translit.byWord(router.query.dealType);
    const filter = filterUtils.query.parse(
        router.query.filter,
        router.query.kind && { kind: [dict.translit.byWord(router.query.kind)] }
    );

    dispatch(setFilter(filter));

    const [asideRef, triggerCalc, asideWidth] = useRecalcWidth();

    const [mapZoomDefault] = useState(true);

    const displayedItems = displayedIds.map(id => mapItems.find(i => i.id === id));

    useEffect(() => {
        dispatch(setDisplayedItemsIds([]));
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
                <FilterSection />
                {displayedIds.length !== 0 && (
                    <ViewCards clusterId={clusterId} items={displayedItems} onToggle={triggerCalc} />
                )}
            </aside>
            <LayoutMap
                mapMarginLeft={asideWidth}
                clusterId={clusterId}
                isDefaultZoom={mapZoomDefault}
                items={mapItems}
            />
        </MapCatalogLayout>
    );
};

MapCatalogPage.getInitialProps = async ({ store, query: { dealType: dealTypeTranslit, filter: filterJson, kind } }) => {
    // const dealType = dict.translit.byWord(dealTypeTranslit);

    // const filter = filterUtils.query.parse(filterJson, kind && { kind: [dict.translit.byWord(kind)] });

    // // store.dispatch(fetchMapPropertiesSubset(queryUtils.convert({ filter }, dealType)));

    return {};

    // return { dealType, filter };
};

// createSelector()

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
