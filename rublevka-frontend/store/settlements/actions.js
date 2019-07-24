import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import api from '@api';
import { page, dict, createApiCallTypes } from '@utils';

export const settlementsFetchTypes = createApiCallTypes('Settlements', 'Load');

export const fetchSettlements = () => ({
    types: settlementsFetchTypes.value,
    cacheKey: 'settlements',
    getCache: state => state.settlements.cache,
    shouldCall: state => !state.settlements.list.length,
    call: () => api.settlements.getMany(),
});

export const settlementsItemFetchTypes = createApiCallTypes('Settlements', 'ItemLoad');

export const fetchSettlementsItem = id => ({
    types: settlementsItemFetchTypes.value,
    // shouldCall: state => !state.settlements.items[id],
    call: () => api.settlements.getOne(id),
    payload: {
        id,
    },
});

export const CHANGE_ORDER = 'Properties.OrderBy.Change';
export const changeOrderBy = type => dispatch => {
    dispatch({
        type: CHANGE_ORDER,
        payload: {
            type,
        },
    });

    page.pushQuery({ orderBy: type });
};

export const UPDATE_FILTER_FIELD = 'Properties.Filter.UpdateField';
export const updateFilterField = (fieldName, value) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_FILTER_FIELD,
        payload: {
            fieldName,
            value,
        },
    });

    const { filter = {} } = getState().properties;

    const nextFilter = pickBy(filter, v => !isEmpty(v));

    const isKindOnly = Object.keys(nextFilter).length === 1 && nextFilter.kind && nextFilter.kind.length === 1;

    if (isKindOnly) {
        const kind = dict.translit.byWord(nextFilter.kind[0]);

        return page.pushQuery({ filter: null }, { kind }, kind);
    }

    page.pushQuery({ filter: !isEmpty(nextFilter) && JSON.stringify(nextFilter) });

    return nextFilter;
};

export const SET_DEAL_TYPE = 'Properties.DealType.Set';
export const setDealType = dealType => ({
    type: SET_DEAL_TYPE,
    payload: {
        dealType,
    },
});

export const SET_FILTER = 'Properties.Filter.Set';
export const setFilter = filter => ({
    type: SET_FILTER,
    payload: {
        filter,
    },
});
