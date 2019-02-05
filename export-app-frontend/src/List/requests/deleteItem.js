import { FirebaseDefaultInstance } from '../../firebase';

export default function deleteItem(id) {
  return FirebaseDefaultInstance.delete('properties', id);
}
