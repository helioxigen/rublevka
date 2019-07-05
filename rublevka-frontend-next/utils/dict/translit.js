function translitByLetters(str = '') {
    const ru = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'j',
        з: 'z',
        и: 'i',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'c',
        ч: 'ch',
        ш: 'sh',
        щ: 'shch',
        ы: 'y',
        э: 'e',
        ю: 'u',
        я: 'ya',
    };

    const letters = str
        .replace(/[ъь]+/g, '')
        .replace(/й/g, 'i')
        .split('');

    return letters
        .map(letter => {
            const res = ru[letter.toLowerCase()];

            if (res) return res;

            return letter;
        })
        .join('')
        .replace(' ', '-');
}

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

export default {
    byWord: word => dictionary[word],
    byLetters: translitByLetters,
};
