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
    },
    price: {
        title: 'Цена',
        placeholder: 'Любая',
        type: 'range',
        range: {
            priceTemplate: (v, dealType) => (v === 0 ? '0' : `${v} ${dealType === 'rent' ? 'тыс/мес' : 'млн'}`),
        },
    },
    bedrooms: {
        title: 'Спален',
        placeholder: 'Любое количество',
        type: 'list',
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
    },
    distance: {
        title: 'От мкад',
        placeholder: 'Любое',
        type: 'range',
        range: {
            options: filter.template.generic(25, 5, v => `${v} км`),
            template: v => `${v} км`,
        },
    },
    name: {
        placeholder: 'Введите название посёлка',
        type: 'text',
    },
    objectNumber: {
        placeholder: 'Введите номер объекта',
        type: 'text',
    },
};

export default {
    types: {
        sale: {
            fields: ['kind', 'price', 'bedrooms'],
        },
        rent: {
            fields: ['kind', 'price', 'bedrooms'],
        },
        objectNumber: {
            fields: ['objectNumber'],
        },
        settlements: {
            fields: ['name', 'distance'],
        },
    },
    fields,
};
