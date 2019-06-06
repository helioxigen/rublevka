import { parseString } from 'xml2js';

// Check meta tags for status-code and headers and set neccessary headers and status
export function getStatusCode(meta, cb) {
  const xml = `<root>${meta}</root>`;

  parseString(xml, (err, result) => {
    const status = (result.root.meta &&
      result.root.meta.find(item => item.$.name === 'status-code')) || {
      $: { content: 200 }, // eslint-disable-line id-length
    };

    const headers =
      (result.root.meta &&
        result.root.meta.filter(item => item.$.name === 'header')) ||
      [];

    cb({ status, headers });
  });
}

export function sendResponse(res, status, metaHeaders, body) {
  if (status) {
    res.status(status.$.content);
    if (status.$.content >= 200 && status.$.content < 300) {
      res.send(body);
    } else {
      if (metaHeaders.length) {
        const headers = {};

        metaHeaders.forEach(item => {
          headers[item.$.header] = item.$.content;
        });

        res.set(headers);
      }
      res.send();
    }
  } else {
    res.send(body);
  }
}
