export function apiCallMiddleware({ dispatch, getState }) {
    return next => action => {
        const {
            types,
            call,
            cacheKey,
            getCache,
            shouldCheckCache = () => true,
            shouldCall = () => true,
            payload = {},
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action);
        }

        // if (!Array.isArray(types) || types.length !== 4 || !types.every(type => typeof type === 'string')) {
        //     throw new Error('Expected an array of three string types.');
        // }

        if (typeof call !== 'function') {
            throw new Error('Expected call to be a function.');
        }

        if (!shouldCall(getState())) {
            return {};
        }

        const [requestType, successType, failureType, cacheType] = types;
        // if (cacheKey && getCache && cacheType && !shouldCheckCache()) {
        //     const cached = getCache(getState())[cacheKey];

        //     if (cached)
        //         return dispatch(
        //             Object.assign({}, payload, {
        //                 response: cached,
        //                 type: cacheType,
        //             })
        //         );
        // }

        dispatch(
            Object.assign({}, payload, {
                type: requestType,
            })
        );

        return call().then(
            response =>
                dispatch(
                    Object.assign({}, payload, {
                        response,
                        cacheKey,
                        type: successType,
                    })
                ),
            error =>
                dispatch(
                    Object.assign({}, payload, {
                        error,
                        type: failureType,
                    })
                )
        );
    };
}
