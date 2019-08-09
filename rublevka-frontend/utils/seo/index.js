/* eslint-disable global-require */
import optional from '../optional';
import dict from '../dict';
import format from '../format';
import config from '@config';

const domain = format.capitalize(config.site.domain);

const property = (dealType, kind, id, settlementName, mkadDistance, offer, route, region) => {
    const price = format.price(offer.price, offer.currency);

    const title = optional
        .str(
            dict.translateKind(kind).noun,
            `ID ${id}`,
            settlementName && `в поселке «${settlementName}»,`,
            mkadDistance && `${mkadDistance}  км от МКАД,`,
            `по цене ${price},`,
            route && `${route} шоссе`,
            `– агентство недвижимости ${domain}`
        )
        .join(' ');

    const description = optional
        .str(
            dict.translateDealType(dealType).noun,
            dict.translateKind(kind).genitive,
            `ID ${id}`,
            `по цене ${price}`,
            settlementName && `в поселке «${settlementName}»,`,
            mkadDistance && `в ${mkadDistance} км от МКАД,`,
            route && `на ${format.replaceEnd(route, 'ое', 'ом')} направлении,`,
            region
        )
        .join(' ');

    return {
        title,
        description,
    };
};

const list = (dealType, kind = 'root', pathname, page) => {
    const titles = require('./data/title.list.json');
    const descs = require('./data/description.list.json');

    const getValue = metaDict => {
        const appMetaDict = metaDict[config.app];

        if (!appMetaDict) throw new Error(`App ${config.app} not found in meta dictionary`);

        const value = appMetaDict[dealType][kind];

        if (!value) throw new Error(`Kind "${kind}" not found in meta dictionary`);

        return value;
    };

    const pagePostfix = page > 1 ? `— cтраница ${page}` : '';

    return {
        title: `${getValue(titles)} ${pagePostfix}`,
        description: getValue(descs),
        pathname,
    };
};

const byDealType = dealType => (ifSale, ifRent) => (dealType === 'sale' ? ifSale : ifRent);

const settlements = {
    list: {
        title: `Коттеджные посёлки в Московской области на ${domain}`,
        description: `Коттеджные посёлки в ${domain}. Лучшие предложения на ${domain}!`,
    },
    item: (dealType, kind, name, routeName) => {
        const by = byDealType(dealType);
        const body = kind
            ? `${by('Продажа', 'Снять')} ${dict.translateKind(kind).genitive}`
            : `${by('Купить', 'Взять в аренду')} недвижимость`;

        return {
            title: `Коттеджный поселок ${name} на ${format.replaceEnd(routeName, 'ое', 'ом')} шоссе — ${by(
                'купить дом или участок',
                'арендовать дом'
            )} в КП ${name} | ${config.site.title}`,
            description: `${body} в коттеджном поселке ${name}. Лучшие предложения на ${domain}!`,
        };
    },
};

export default {
    property,
    list,
    settlements,
};
