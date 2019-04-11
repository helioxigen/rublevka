const xml = require('xml');
const { createHouseObject } = require('./createHouseObject');
const { createLandObject } = require('./createLandObject');

function createXML(items) {
  const data = {
    feed: [
      {
        feed_version: 2,
      },
      ...items.map(item => (item.kind === 'land' ? createLandObject(item) : createHouseObject(item))),
    ],
  };

  return xml(data);
}

exports.createXML = createXML;
