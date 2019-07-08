import app from '../app';
import compact from 'lodash/compact';
import { fromQuery } from './fields';

const defaults = {
    sale: {
        filter: {
            state: ['public', 'rented'],
            'location.routeId': app.getConfig().routes,
            'saleOffer.isResale': 'true',
            'saleOffer.price': '0..',
        },
        filterNot: { 'saleOffer.isDisabled': true },
    },
    rent: {
        filter: {
            state: ['public'],
            'location.routeId': app.getConfig().routes,
            'rentOffer.price': '0..',
        },
        filterNot: {
            'rentOffer.isDisabled': true,
        },
    },
};

const getDefaults = dealType => defaults[dealType];

const filterToQuery = filter => {
    const goodFilter = {};

    Object.entries(filter).forEach(([key, value]) => {
        let val = value;

        if (Object.keys(value).length === 0) return;

        if (value instanceof Array) {
            val = value.join(',');
        }

        if (value.from || value.to) {
            val = `${value.from || ''}..${value.to || ''}`;
        }

        goodFilter[key] = val;
    });

    return goodFilter;
};

const createFilterQuery = (filterObj, dealType) => ({
    filter: {
        ...defaults[dealType].filter,
        ...filterToQuery(filterObj),
    },
    filterNot: {
        ...defaults[dealType].filterNot,
    },
});

const filterFromQuery = filter => {
    const goodFilter = {};

    Object.entries(filter).forEach(([key, value]) => {
        if (!value) return;

        goodFilter[key] = fromQuery(key, value);
    });

    return goodFilter;
};

const parse = (filterJson = '{}', ...explicitFields) =>
    Object.assign({}, JSON.parse(filterJson), ...compact(explicitFields));

export default {
    getDefaults,
    createFilterQuery,
    filterToQuery,
    filterFromQuery,
    parse,
};
