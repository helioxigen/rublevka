import { FirebaseDefaultInstance } from '../../firebase';

export default function updateItem(id, data) {
  return FirebaseDefaultInstance.update('properties', id, data);
}
