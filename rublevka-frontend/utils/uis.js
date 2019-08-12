export default {
    send: (name = '', phone = '', comment) =>
        new Promise((res, rej) => {
            window.Comagic.addOfflineRequest(
                {
                    name,
                    phone,
                    message: comment,
                },
                r => (r.status === 200 ? res(r.response) : rej(r.response))
            );
        }),
};
