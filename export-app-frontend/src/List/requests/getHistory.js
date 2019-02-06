import { FBRublevka } from '../../firebase';

function mapDocs(doc) {
  return {
    docID: doc.id,
    ...doc.data(),
  };
}

export default function getHistory() {
  return FBRublevka.getCollection('history')
    .orderBy('updatedAt', 'desc')
    .get()
    .then(snapshot => snapshot.docs.map(mapDocs))
    .then(docs => docs.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: docs
          .filter(({ id }) => id === curr.id)
          .sort((a, b) => a.updatedAt.seconds - b.updatedAt.seconds),
      }),
      {},
    ));
}
