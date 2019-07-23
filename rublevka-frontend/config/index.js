import rublevka from './rublevka';
import riga from './riga';
import { API_ENDPOINT, CDN } from './resource';

const sites = [riga, rublevka];

export default {
    app: process.env.APP,
    currencies: [
        {
            label: 'Доллар',
            code: 'usd',
            symbol: '$',
        },
        {
            label: 'Евро',
            code: 'eur',
            symbol: '€',
        },
        {
            label: 'Рубль',
            code: 'rub',
            symbol: '₽',
        },
    ],
    resource: {
        API_ENDPOINT,
        CDN,
    },
    site: sites.find(c => c.name === process.env.APP),
};
