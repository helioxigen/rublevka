import rublevka from './rublevka';
import riga from './riga';
import { API_ENDPOINT, CDN } from './resource';

const sites = [riga, rublevka];

export default {
    app: process.env.APP,
    currencies: [
        {
            code: 'usd',
            symbol: '$',
        },
        {
            code: 'eur',
            symbol: '€',
        },
        {
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
