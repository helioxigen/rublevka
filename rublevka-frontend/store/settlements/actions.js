import api from '@api';
import { createApiCallTypes } from '@utils';

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
    shouldCall: state => !state.settlements.items[id],
    call: async () => api.settlements.getOne(id),
    payload: {
        id,
    },
});

export const SET_SETTLEMENT_ITEM_DEAL_TYPES = 'Settlements.Item.SetDealTypes';

export const setSettlementItemDealTypes = (id, dealTypes) => ({
    type: SET_SETTLEMENT_ITEM_DEAL_TYPES,
    payload: {
        id,
        dealTypes,
    },
});

export const settlementPropertiesFetchTypes = createApiCallTypes('Settlements', 'PropertiesLoad');

export const fetchSettlementProperties = (id, query) => ({
    types: settlementsItemFetchTypes.value,
    shouldCall: state => !state.settlements.items[id],
    call: async () => api.properties.getMany(0, query),
    payload: {
        id,
    },
});
