import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class FirebaseClass {
  constructor(config) {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  getCollection = collection => this.db.collection(collection);

  // prettier can't fold that line
  // eslint-disable-next-line max-len
  getCollectionOnSnapshot = (collection, cb) => this.db.collection(collection).onSnapshot(cb);

  get = (collection, id) => this.db
    .collection(collection)
    .doc(id)
    .get();

  set = (collection, data) => this.db.collection(collection).add(data);

  setWithKey = (collection, key, data) => this.db
    .collection(collection)
    .doc(key)
    .set(data);

  setIfNotExists = (collection, data) => {
    const col = this.db.collection(collection);

    return col
      .where('id', '==', data.id)
      .where('offerKind', '==', data.offerKind)
      .get()
      .then(res => res.docs)
      .then((docs) => {
        if (docs.length > 0) {
          return Promise.reject(new Error('exists'));
        }
        return col.add(data);
      });
  };

  addOrUpdate = (collection, data) => {
    const col = this.db.collection(collection);

    return col
      .where('id', '==', data.id)
      .where('offerKind', '==', data.offerKind)
      .get()
      .then(res => res.docs)
      .then((docs) => {
        if (docs.length > 0) {
          const { id } = docs[0];

          return this.setWithKey(collection, id, data);
        }

        return col.add(data);
      });
  };

  delete = (collection, id) => this.db
    .collection(collection)
    .doc(id)
    .delete();

  update = (collection, id, data) => this.db
    .collection(collection)
    .doc(id)
    .update(data);
}

const rublevkaExportAppConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const FirebaseDefaultInstance = new FirebaseClass(rublevkaExportAppConfig);

export { FirebaseClass, FirebaseDefaultInstance };
