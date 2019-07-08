import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MapCatalogLayout } from '@components/UI';
import { FilterSection, ViewCards, LayoutMap } from '@components/MapCatalog';
import { changeOrderBy, fetchMapProperties } from '@store';
import { dict, query as queryUtils, filter as filterUtils } from '@utils';
import { useToggle } from '@hooks';
import { Navbar } from '@components';

const HideNav = createGlobalStyle`
    ${Navbar} {
        transform: translateY(-100%);
        transition: 0.4s;
    }
`;

const MapCatalogPage = ({ dealType, filter }) => {
    const [, toggleDidMount] = useToggle(false);
    const dispatch = useDispatch();
    const viewItems = [];
    const mapItems = useSelector(state => state.map.list);
    // const {
    //     query: { filter },
    // } = useRouter();

    useEffect(() => {
        dispatch(fetchMapProperties(queryUtils.convert({ filter }, dealType)));
    }, [filter]);

    useEffect(() => {
        toggleDidMount();
    }, []);

    // useEffect(() => {

    // }, [router.query]);

    return (
        <MapCatalogLayout>
            <HideNav />
            <aside>
                <FilterSection />
                {!viewItems && <ViewCards items={viewItems} />}
            </aside>
            <LayoutMap items={mapItems} />
        </MapCatalogLayout>
    );
};

MapCatalogPage.getInitialProps = async ({ store, query: { dealType: dealTypeTranslit, filter: filterJson, kind } }) => {
    const dealType = dict.translit.byWord(dealTypeTranslit);

    const filter = filterUtils.query.parse(filterJson, kind && { kind: [dict.translit.byWord(kind)] });

    // store.dispatch(fetchMapProperties(queryUtils.convert({ filter }, dealType)));

    return { dealType, filter };
};

// createSelector()

export default connect(
    state => ({
        list: state.map.list,
        fetching: state.map.fetching,
        totalItems: state.map.total,
        user: state.user.currency,
    }),
    dispatch => ({
        handleToggleSort: type => dispatch(changeOrderBy(type)),
    })
)(MapCatalogPage);
