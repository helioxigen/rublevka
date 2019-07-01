export function apiCallMiddleware({ dispatch, getState }) {
    return next => action => {
        const { types, call, shouldCall = () => true, payload = {} } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action);
        }

        if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
            throw new Error('Expected an array of three string types.');
        }

        if (typeof call !== 'function') {
            throw new Error('Expected call to be a function.');
        }

        if (!shouldCall(getState())) {
            return {};
        }

        const [requestType, successType, failureType] = types;

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
