export default dict => ({
    settlements: () => ({
        href: '/settlements.list',
        as: '/zagorodnaya/kottedzhnye-poselki',
        label: 'Посёлки',
    }),
    'settlements.item': ({ id, name }) => ({
        href: `/settlements.item?id=${id}&name=${name}`,
        as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
        label: name,
    }),
    item: ({ id, dealType: dealTypeN, kind: kindN, prevPage }) => {
        const [dealType, kind] = dict.translit.byWord(dealTypeN, kindN);

        return {
            href: {
                pathname: '/item',
                query: {
                    dealType,
                    kind,
                    id,
                    prevPage,
                },
            },
            as: `/zagorodnaya/${dealType}/${kind}/${id}`,
        };
    },
    contacts: () => ({
        href: '/contacts',
        label: 'Контакты',
    }),
});
