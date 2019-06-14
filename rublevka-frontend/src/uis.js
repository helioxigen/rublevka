/* global Comagic */

export default {
  send: (name = '', phone = '', comment) =>
    new Promise((res, rej) => {
      window.Comagic.addOfflineRequest(
        {
          name,
          phone,
          message: comment,
        },
        r => {
          console.log(r);
          return r.success ? res() : rej(r.result);
        },
      );
    }),
};
