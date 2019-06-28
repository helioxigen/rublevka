const dictionary = {
    // Categories
    zagorodnaya: 'country',
    gorodskaya: 'city',
    // Categories translit
    country: 'zagorodnaya',
    city: 'gorodskaya',
    // Deal types
    prodaja: 'sale',
    arenda: 'rent',
    // Deal types translit
    sale: 'prodaja',
    rent: 'arenda',
    // Place kinds
    shosse: 'routes',
    rayon: 'districts',
    'nas-punkt': 'localities',
    'kottedzhnye-poselki': 'settlements',
    // Place kinds translit
    routes: 'shosse',
    districts: 'rayon',
    localities: 'nas-punkt',
    settlements: 'kottedzhnye-poselki',
    // Kinds
    dom: 'house',
    uchastok: 'land',
    kvartira: 'flat',
    taunhaus: 'townhouse',
    penthaus: 'penthouse',
    apartamenty: 'apartment',
    ofis: 'office',
    // Kinds translit
    house: 'dom',
    land: 'uchastok',
    flat: 'kvartira',
    townhouse: 'taunhaus',
    penthouse: 'penthaus',
    apartment: 'apartamenty',
    office: 'ofis',
};

const dealTypes = {
    sale: ['Продажа', 'Купить'],
    rent: ['Аренда', 'Арендовать'],
};

const translateDealType = dealType => {
    const [noun, verb] = dealTypes[dealType];

    return {
        noun,
        verb,
    };
};

export default {
    translit: word => dictionary[word],
    translateDealType,
};
