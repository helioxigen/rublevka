/* eslint-disable */
/**
 * @template XD
 * @param {XD} ma
 * @returns {Parameters<XD['settlements.item']>}
 */
const Qt = ma => {};

Qt({
    'settlements.item': ({ id, name }) => ({
        href: `/settlements.item?id=${id}`,
        as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(game)}_${id}`,
        label: game,
    }),
});
