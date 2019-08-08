import types from './types';

const setStorageItem = (key, value) => ({
    type: types.SET_STORAGE_ITEM,
    payload: {
        key,
        value,
    },
});

const mergeStorageItem = (key, value) => ({
    type: types.MERGE_STORAGE_ITEM,
    payload: {
        key,
        value,
    },
});

export default {
    setStorageItem,
    mergeStorageItem,
};
