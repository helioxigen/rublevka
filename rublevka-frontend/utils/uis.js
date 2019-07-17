export default {
    send: (name = '', phone = '', comment) =>
        new Promise((res, rej) => {
            window.Comagic.addOfflineRequest(
                {
                    name,
                    phone,
                    message: comment,
                },
                r => (r.success ? res() : rej(r.result))
            );
        }),
};
