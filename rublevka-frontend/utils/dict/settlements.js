import flatten from 'lodash/flatten';

const sort = entries =>
    entries
        .reduce(
            ([rus, eng, num], entry) => {
                const [first] = entry;

                if (/[а-яА-ЯЁё]/.test(first)) {
                    rus.push(entry);
                } else if (/[a-zA-Z]/.test(first)) {
                    eng.push(entry);
                } else {
                    num.push(entry);
                }

                return [rus, eng, num];
            },
            [[], [], []]
        )
        .map(lang => lang.sort(([a], [b]) => a.localeCompare(b)));

export default {
    sortEntries: entries => flatten(sort(entries)),
};
