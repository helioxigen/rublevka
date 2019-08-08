import * as types from './types';

function setFilter(filter) {
    return {
        type: types.SET_FILTER,
        payload: {
            filter,
        },
    };
}

function updateFilterField(fieldName, value) {
    return {
        type: types.UPDATE_FILTER_FIELD,
        payload: {
            fieldName,
            value,
        },
    };
}

function setOrder(orderType) {
    return {
        type: types.SET_ORDER,
        payload: {
            orderType,
        },
    };
}

function updatePagination(total, offset, limit = 24) {
    return {
        type: types.UPDATE_PAGINATION,
        payload: {
            total,
            offset,
            limit,
        },
    };
}

export default { setFilter, updateFilterField, updatePagination, setOrder };
