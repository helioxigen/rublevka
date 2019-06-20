const xml = require('xml');
const { createHouseObject } = require('./createHouseObject');
const { createLandObject } = require('./createLandObject');

function createXML(items) {
  const data = {
    feed: [
      {
        feed_version: 2,
      },
      ...items.map(item => (item.kind === 'land' ? createLandObject(item) : createHouseObject(item))).filter(x => x != null), 
      //we filter null objects, because if some house had processing error, it will be returned as "null"
    ],
  };

  return xml(data);
}

exports.createXML = createXML;
