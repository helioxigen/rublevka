import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';

export default function useFuseSearch(value, list = [], initialResults, keys = ['name']) {
    const [results, setResults] = useState(initialResults || list);

    useEffect(() => {
        setResults(list);
    }, [list]);

    const fuse = useMemo(
        () =>
            new Fuse(list, {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys,
            }),
        [list]
    );

    useEffect(() => {
        if (value) {
            const res = fuse.search(value);

            if (res !== results) {
                setResults(Object.values(res));
            }
        }
    }, [value]);

    return results;
}
