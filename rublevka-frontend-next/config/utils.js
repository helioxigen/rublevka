const routes = [
    { name: 'Рублёво-Успенское', id: 1178 },
    { name: 'Новорижское', id: 1186 },
    { name: 'Ильинское', id: 1192 },
    { name: 'Минское', id: 1179 },
    { name: 'Сколковское', id: 1181 },
    { name: 'Киевское', id: 1177 },
    { name: 'Калужское', id: 1183 },
];

export const getRouteIds = (...names) => routes.filter(v => names.some(n => n === v.name)).map(v => v.id);
