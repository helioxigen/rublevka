import api from '@api';

export const LOAD_MAP_PROPERTIES_REQUEST = 'MapProperties.Load.Request';
export const LOAD_MAP_PROPERTIES_SUCCESS = 'MapProperties.Load.Success';
export const LOAD_MAP_PROPERTIES_ERROR = 'MapProperties.Load.Error';
export const LOAD_MAP_PROPERTIES_CACHE = 'MapProperties.Load.CacheRestore';

// console.log(api);

export const fetchMapProperties = query => ({
    types: [
        LOAD_MAP_PROPERTIES_REQUEST,
        LOAD_MAP_PROPERTIES_SUCCESS,
        LOAD_MAP_PROPERTIES_ERROR,
        LOAD_MAP_PROPERTIES_CACHE,
    ],
    cacheKey: JSON.stringify(query),
    getCache: state => state.map.cache,
    call: () => api.properties.getAll(query),
});
