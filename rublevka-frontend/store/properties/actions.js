import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import api from '@api';
import { page, dict } from '@utils';

export const LOAD_PROPERTIES_REQUEST = 'Properties.Load.Request';
export const LOAD_PROPERTIES_SUCCESS = 'Properties.Load.Success';
export const LOAD_PROPERTIES_FROM_CACHE = 'Properties.Load.FromCache';
export const LOAD_PROPERTIES_ERROR = 'Properties.Load.Error';

export const fetchProperties = (dealType, pagination, query, userFilter, userOrder, asMore) => ({
    types: [LOAD_PROPERTIES_REQUEST, LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR],
    // shouldCall: state => (asMore ? true : !state.properties.list[dealType].length),
    call: () => api.properties.getMany(pagination, query),
    payload: {
        pagination,
        query,
        filter: userFilter,
        orderBy: userOrder,
        asMore,
        dealType,
    },
});

export const LOAD_SETTLEMENT_PROPERTIES_SUCCESS = 'Properties.LoadSettlement.Success';

export const fetchSettlementProperties = (dealType, pagination, query, userFilter, userOrder, asMore) => ({
    types: [LOAD_PROPERTIES_REQUEST, LOAD_SETTLEMENT_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR],
    call: () => api.properties.getMany(pagination, query),
    payload: {
        pagination,
        query,
        filter: userFilter,
        orderBy: userOrder,
        asMore,
        dealType,
    },
});

export const LOAD_PROPERTY_REQUEST = 'Properties.LoadItem.Request';
export const LOAD_PROPERTY_SUCCESS = 'Properties.LoadItem.Success';

export const fetchProperty = (id, ...restrictedStates) => ({
    types: [LOAD_PROPERTY_REQUEST, LOAD_PROPERTY_SUCCESS, LOAD_PROPERTIES_ERROR],
    shouldCall: state => !state.properties.items[id],
    call: () => api.properties.getOne(id, ...restrictedStates),
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

const pushFilter = filter => {
    const nextFilter = pickBy(filter, v => !isEmpty(v));

    const isKindOnly = Object.keys(nextFilter).length === 1 && nextFilter.kind && nextFilter.kind.length === 1;

    if (isKindOnly) {
        const kind = dict.translit.byWord(nextFilter.kind[0]);

        return page.pushQuery({ filter: null }, { kind }, kind);
    }

    return page.pushQuery({ filter: !isEmpty(nextFilter) && JSON.stringify(nextFilter), page: null });
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

    pushFilter(filter);
};

export const SET_DEAL_TYPE = 'Properties.DealType.Set';
export const setDealType = dealType => ({
    type: SET_DEAL_TYPE,
    payload: {
        dealType,
    },
});

export const SET_FILTER = 'Properties.Filter.Set';
export const setFilter = (filter, push = false) => dispatch => {
    dispatch({
        type: SET_FILTER,
        payload: {
            filter,
        },
    });

    if (push) {
        pushFilter(filter);
    }
};
