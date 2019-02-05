import { FirebaseDefaultInstance } from '../../firebase';

export default function sendItemToDB(item) {
  return FirebaseDefaultInstance.addOrUpdate('properties', item);
}
