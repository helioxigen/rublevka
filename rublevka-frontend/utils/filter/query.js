import compact from 'lodash/compact';
import app from '../app';
import { fromQuery } from './fields';

const defaults = {
    sale: {
        filter: {
            state: ['public', 'rented'],
            'location.routeId': app.config.routes,
            'saleOffer.isResale': 'true',
            'saleOffer.price': '0..',
        },
        filterNot: { 'saleOffer.isDisabled': true },
    },
    rent: {
        filter: {
            state: ['public'],
            'location.routeId': app.config.routes,
            'rentOffer.price': '0..',
        },
        filterNot: {
            'rentOffer.isDisabled': true,
        },
    },
    settlements: {
        filter: {
            state: ['public'],
            'location.routeId': app.config.routes,
            'statistics.totalProperties': '1..',
        },
    },
};

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

        if (key.includes('multiCurrencyPrice')) {
            const isRent = key.includes('rent');
            const mult = isRent ? 1000 : 1000000;

            const from = (value.from || 0) * mult;
            const to = value.to > 0 ? value.to * mult : '';

            val = `${from}..${to}`;
        }

        goodFilter[key] = val;
    });

    return goodFilter;
};

const createFilterQuery = (filterObj, dealType) => ({
    filter: {
        ...defaults[dealType].filter,
        ...filterToQuery(filterObj, dealType),
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
    getDefaults: dealType => filterToQuery(defaults[dealType]),
    createFilterQuery,
    filterToQuery,
    filterFromQuery,
    parse,
};
