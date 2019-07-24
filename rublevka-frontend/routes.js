import { dict } from '@utils';

export default {
    settlements: () => ({
        href: '/settlements.list',
        as: '/zagorodnaya/kottedzhnye-poselki',
        label: 'Посёлки',
    }),
    'settlements.item': ({ id, name }) => ({
        href: `/settlements.item?id=${id}`,
        as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
        label: name,
    }),
    contacts: () => ({
        href: '/contacts',
        label: 'Контакты',
    }),
};
