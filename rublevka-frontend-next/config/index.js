import rublevka from './rublevka';
import { API_ENDPOINT, CDN } from './resource';

export default {
    app: 'rublevka',
    currencies: [
        {
            code: 'usd',
            symbol: '$',
            multiplier: 1,
        },
        {
            code: 'eur',
            symbol: '€',
            multiplier: 1,
        },
        {
            code: 'rub',
            symbol: '₽',
            multiplier: 50,
        },
    ],
    resource: {
        API_ENDPOINT,
        CDN,
    },
    routes: [
        { name: 'Рублёво-Успенское', id: 1178 },
        { name: 'Новорижское', id: 1186 },
        { name: 'Ильинское', id: 1192 },
        { name: 'Минское', id: 1179 },
        { name: 'Сколковское', id: 1181 },
        { name: 'Киевское', id: 1177 },
        { name: 'Калужское', id: 1183 },
    ],
    sites: {
        rublevka,
    },
};
