const fields = {
    kind: {
        title: 'Тип объекта',
        placeholder: 'Любой',
        main: true,
        items: {
            rent: [
                {
                    value: 'house',
                    name: 'Дом',
                },
                {
                    value: 'townhouse',
                    name: 'Таунхаус',
                },
                {
                    value: 'flat',
                    name: 'Квартира',
                },
            ],
            sell: [
                {
                    value: 'house',
                    name: 'Дом',
                },
                {
                    value: 'land',
                    name: 'Участок',
                },
                {
                    value: 'townhouse',
                    name: 'Таунхаус',
                },
                {
                    value: 'flat',
                    name: 'Квартира',
                },
            ],
        },
    },
    price: {
        title: 'Цена',
        placeholder: 'Любая',
        type: 'price',
        // currencySelector: true,
        items: [
            {
                value: 0,
                label: '0 ₽',
            },
            {
                value: 50,
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
    bedrooms: {
        title: 'Спален',
        placeholder: 'Любое количество',
        type: 'from-range',
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
};

export default {
    types: {
        sell: {
            fields: ['kind', 'price', 'bedrooms'],
        },
        rent: {
            fields: ['kind', 'price', 'bedrooms'],
        },
    },
    fields,
};
