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
            sell: [
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
            template: v => (v === 0 ? '0' : `${v} млн`),
        },
    },
    bedrooms: {
        title: 'Спален',
        placeholder: 'Любое количество',
        type: 'from-range',
        items: [
            {
                value: 2,
                name: '2+',
            },
            {
                value: 3,
                name: '3+',
            },
            {
                value: 4,
                name: '4+',
            },
            {
                value: 5,
                name: '5+',
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
