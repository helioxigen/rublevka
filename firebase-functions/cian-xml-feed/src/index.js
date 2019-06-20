const admin = require('firebase-admin');

const { join } = require('path');
const { splitEvery, flatten } = require('ramda');
const os = require('os');

const { mapDocs, writeFileAsync } = require('./helpers');
const { getItemsFromAPI } = require('./getItemsFromAPI');
const { createXML } = require('./createXML');

const app = admin.initializeApp();
const API_PAGE_SIZE = 256;

const tmpdir = os.tmpdir();

const fileStorage = app.storage().bucket();

const metadata = {
  contentType: 'text/xml',
};

module.exports = () => admin
  .firestore()
  .collection('properties')
  .get()
  .then(snapshot => snapshot.docs.map(mapDocs))
  .then((docs) => {
    const ids = docs.map(doc => doc.id);
    const idsParts = splitEvery(API_PAGE_SIZE, ids);

    const promises = idsParts.map(part => getItemsFromAPI(part.join(',')));
    const filename = `feed_${Math.random()
      .toString(36)
      .slice(2)}.xml`;

    return Promise.all(promises)
      .then(data => data.map(response => response.items))
      .then(items => flatten(items))
      .then(items => items.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        {},
      ))
      .then(items => docs.map(doc => ({ ...doc, ...items[doc.id] })))
      .then(items => items.filter(({ state }) => !!state)) // because not all in state=public
      .then(items => writeFileAsync(join(tmpdir, filename), createXML(items)))
      .then(() => fileStorage.upload(join(tmpdir, filename), {
        destination: 'cian-feed.xml',
        metadata,
      }))
      .then(() => {
        return true;
      });
  });
