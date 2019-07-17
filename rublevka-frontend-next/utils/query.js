// import compact from 'lodash/compact';
import filterQuery from './filter/query';

const transformToQuery = obj =>
    Object.entries(obj)
        .map(([key, value]) =>
            Object.entries(value).map(([valueKey, valueValue]) => `${key}[${valueKey}]=${valueValue}`)
        )
        .reduce((acc, v) => acc.concat(v))
        .join('&');

// const cleanRouterQuery = (...objs) => compact(objs).reduce((acc, ));

const orderByToQuery = (orderBy, dealType, currency = 'rub') => {
    if (!orderBy) return {};

    const [type, direction] = orderBy.split('.');

    const getFieldName = () => {
        if (type === 'price') return `${dealType}Offer.multiCurrencyPrice.${currency}`;
        if (type === 'mkadDistance') return 'location.mkadDistance';
    };

    return {
        orderBy: {
            [getFieldName()]: direction,
        },
    };
};

export default {
    get: transformToQuery,
    convert: ({ filter, orderBy }, dealType) => ({
        ...filterQuery.createFilterQuery(filter, dealType),
        ...orderByToQuery(orderBy, dealType),
    }),
};
