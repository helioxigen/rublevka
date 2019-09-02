const baseRoutes = [
    { name: 'Рублёво-Успенское', id: 1178 },
    { name: 'Новорижское', id: 1186 },
    { name: 'Ильинское', id: 1192 },
    { name: 'Минское', id: 1179 },
    { name: 'Сколковское', id: 1181 },
    { name: 'Киевское', id: 1177 },
    { name: 'Калужское', id: 1183 },
];

export const getRouteIds = (...names) => baseRoutes.filter(v => names.some(n => n === v.name)).map(v => v.id);

export default class SiteConfig {
    constructor(
        name,
        {
            title,
            phone,
            whatsapp,
            domain,
            email,
            routes,
            defaultCurrency = 'usd',
            meta: { title: metaTitle, description },
            popularSettlements = [[0, '']],
            cdnWatermarkUUID,
        }
    ) {
        this.phone = phone;
        this.phoneNumbers = phone.match(/\d/g).join('');

        this.name = name;
        this.title = title;

        this.domain = domain;

        this.meta = {
            title: metaTitle,
            description,
        };

        this.popularSettlements = popularSettlements;

        this.email = email;
        this.whatsapp = whatsapp;
        this.routes = getRouteIds(...routes);
        this.defaultCurrency = defaultCurrency;

        this.cdnWatermarkUUID = cdnWatermarkUUID;
    }
}
