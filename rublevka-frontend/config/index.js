import rublevka from './rublevka';
import riga from './riga';
import { API_ENDPOINT, CDN } from './resource';

const sites = [riga, rublevka];

export default {
    app: process.env.APP,
    host: process.env.HOST || 'rublevka.ru',
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
    external: {
        gtagId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
        yandexMetrikaId: process.env.REACT_APP_YANDEX_METRIKA_ID,
        uisId: process.env.REACT_APP_UIS_ID || 'gKu4pv_CGaGfagMz62_lHWeAdQB1SK68',
    },
    site: sites.find(c => c.name === process.env.APP),
};
