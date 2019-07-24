import api from '@api';

export const LOAD_MAP_PROPERTIES_REQUEST = 'Map.PropertiesLoad.Request';
export const LOAD_MAP_PROPERTIES_SUCCESS = 'Map.PropertiesLoad.Success';
export const LOAD_MAP_PROPERTIES_ERROR = 'Map.PropertiesLoad.Error';
export const LOAD_MAP_PROPERTIES_CACHE = 'Map.PropertiesLoad.CacheRestore';

export const fetchMapPropertiesSubset = (query, partIdx, partsOverall) => ({
    types: [
        LOAD_MAP_PROPERTIES_REQUEST,
        LOAD_MAP_PROPERTIES_SUCCESS,
        LOAD_MAP_PROPERTIES_ERROR,
        LOAD_MAP_PROPERTIES_CACHE,
    ],
    shouldCheckCache: () => partsOverall > 0 && partIdx === partsOverall,
    cacheKey: JSON.stringify(query),
    getCache: state => state.map.cache,
    call: () => api.properties.getChunk(query, partIdx),
    payload: {
        parts: partsOverall,
        current: partIdx,
    },
});

export const SET_DISPLAYED_ITEMS_IDS = 'Map.DisplayedItemsIds.Set';
export const setDisplayedItemsIds = (ids, clusterId = null) => ({
    type: SET_DISPLAYED_ITEMS_IDS,
    payload: { ids, clusterId },
});
