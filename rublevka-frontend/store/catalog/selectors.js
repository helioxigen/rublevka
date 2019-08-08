const currentPages = state => {
    const { offset, limit, total } = state.catalog.pagination;

    return {
        current: (offset + limit) / limit,
        total: Math.floor(total / limit),
    };
};

export default { currentPages };
