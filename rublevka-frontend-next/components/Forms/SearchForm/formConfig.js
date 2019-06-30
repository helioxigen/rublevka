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
            template: v => (v === 0 ? '0' : `${v} км`),
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
        sell: {
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
