const xml = require('xml');
const { createHouseObject } = require('./createHouseObject');
const { createLandObject } = require('./createLandObject');

function createXML(items) {
  let errors = [];
  let warnings = [];

  let objects = 
    items
    .map(item => {
      const processingResult = item.kind === 'land' ? createLandObject(item) : createHouseObject(item);
      if (processingResult.error){
        //also add this to errors array
        errors.push({id: item.id, text: processingResult.error})
        return null;
      }
      
      if (processingResult.warning){
        warnings.push({id: item.id, text: processingResult.warning})
      }
      return processingResult.item;
    })
    .filter(x => x != null)
    //we filter null objects, because if some house had processing error, it will be returned as "null"

  const data = {
    feed: [
      {
        feed_version: 2,
      },
      ...objects
    ],
  };

  return {
    xml: xml(data), 
    errors: errors, 
    warnings: warnings,
    objectsCount: objects.length
  };
}

exports.createXML = createXML;
