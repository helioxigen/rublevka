import { duck } from '@utils';
import * as types from './types';

const initialState = {
    filter: {},
    orderBy: null,
    pagination: {
        total: 0,
        offset: 0,
        limit: 24,
        pages: {
            current: 0,
            total: 0,
        },
    },
};

export default duck.create({
    [types.SET_ORDER]: ({ orderBy }) => ({ orderBy }),
    [types.SET_FILTER]: ({ filter }) => ({ filter }),
    [types.UPDATE_FILTER_FIELD]: ({ fieldName, value }, state) => ({
        filter: {
            ...state.filter,
            [fieldName]: value,
        },
    }),
    [types.UPDATE_PAGINATION]: ({ total, offset, limit }) => ({
        pagination: {
            total,
            offset,
            limit,
        },
    }),
})(initialState);
