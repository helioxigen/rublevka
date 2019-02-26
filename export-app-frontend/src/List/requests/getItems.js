import { splitEvery, flatten } from 'ramda';
import { FBRublevka } from '../../firebase';
import { mapDocs, reduceDocs } from './helpers';
import getItemsFromAPI from '../../requests/getItemsFromAPI';

const API_PAGE_SIZE = 256;

export default function getItems() {
  return FBRublevka.getCollection('properties')
    .orderBy('top3', 'desc')
    .get()
    .then(snapshot => snapshot.docs.map(mapDocs))
    .then(docs => {
      const ids = docs.map(doc => doc.id);
      const idsParts = splitEvery(API_PAGE_SIZE, ids);

      const promises = idsParts.map(part => getItemsFromAPI(part.join(',')));

      return Promise.all(promises)
        .then(data => data.map(response => response.items))
        .then(items => flatten(items))
        .then(items =>
          items.reduce(
            (acc, item) => ({
              ...acc,
              [item.id]: item,
            }),
            {},
          ),
        )
        .then(items => docs.map(doc => ({ ...doc, data: items[doc.id] })));
    })
    .then(docs =>
      docs.reduce(reduceDocs, {
        itemsOnSale: [],
        itemsOnRent: [],
      }),
    );
}
