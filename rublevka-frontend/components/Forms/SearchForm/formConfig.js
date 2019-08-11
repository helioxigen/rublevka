import { filter } from '@utils';

const fields = {
    kind: {
        title: 'Тип объекта',
        placeholder: 'Любой',
        type: 'list',
        main: true,
        items: {
            rent: [
                {
                    value: 'house',
                    label: 'Дом',
                },
                {
                    value: 'townhouse',
                    label: 'Таунхаус',
                },
                {
                    value: 'flat',
                    label: 'Квартира',
                },
            ],
            sale: [
                {
                    value: 'house',
                    label: 'Дом',
                },
                {
                    value: 'land',
                    label: 'Участок',
                },
                {
                    value: 'townhouse',
                    label: 'Таунхаус',
                },
                {
                    value: 'flat',
                    label: 'Квартира',
                },
            ],
        },
        queryField: 'kind',
    },
    price: {
        title: dealType => (dealType === 'rent' ? 'Цена / мес.' : 'Цена'),
        placeholder: 'Любая',
        type: 'range',
        range: {
            priceTemplate: (v, dealType) => (v === 0 ? '0' : `${v} ${dealType === 'rent' ? 'тыс/мес' : 'млн'}`),
        },
        queryField: 'multiCurrencyPrice',
        queryTpl: (dealType, currency) => `${dealType}Offer.multiCurrencyPrice.${currency}`,
    },
    bedrooms: {
        title: 'Спален',
        placeholder: 'Любое количество',
        type: 'list',
        rangeFrom: true,
        items: [
            {
                value: 2,
                label: '2+',
            },
            {
                value: 3,
                label: '3+',
            },
            {
                value: 4,
                label: '4+',
            },
            {
                value: 5,
                label: '5+',
            },
        ],
        queryField: 'specification.bedrooms',
    },
    distance: {
        title: 'От мкад',
        placeholder: 'Любое',
        type: 'range',
        range: {
            options: filter.template.generic(25, 5, v => `${v} км`),
            template: v => `${v} км`,
        },
        queryField: 'location.mkadDistance',
    },
    landArea: {
        title: 'Площадь (сот.)',
        placeholder: 'Любое',
        type: 'range',
        range: {
            options: filter.template.generic(100, 10, v => `${v} сот.`),
            template: v => `${v} сот.`,
        },
        queryField: 'location.mkadDistance',
    },
    settlementName: {
        placeholder: 'Введите название посёлка',
        type: 'fuzzy',
        listSelector: state => state.settlements.list,
    },
    objectNumber: {
        placeholder: 'Введите номер объекта',
        type: 'text',
    },
};

export default {
    types: {
        sale: {
            defaultState: {
                kind: 'house',
            },
            type: 'query',
            fields: values => ['kind', 'price', values.kind === 'land' ? 'landArea' : 'bedrooms'],
        },
        rent: {
            defaultState: {
                kind: 'house',
            },
            type: 'query',
            fields: values => ['kind', 'price', values.kind === 'land' ? 'landArea' : 'bedrooms'],
        },
        objectNumber: {
            type: 'id',
            fields: () => ['objectNumber'],
        },
        settlements: {
            type: 'search',
            fields: () => ['settlementName', 'distance'],
        },
    },
    fields,
};
