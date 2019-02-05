import { FirebaseDefaultInstance } from '../../firebase';

export default function subscribeToItems(cb) {
  return FirebaseDefaultInstance.getCollectionOnSnapshot('properties', cb);
}
