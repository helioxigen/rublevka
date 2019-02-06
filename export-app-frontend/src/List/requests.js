import { FBRublevka } from '../firebase';

export function remove(id) {
  return FBRublevka.delete('properties', id);
}

export function update(id, data) {
  return FBRublevka.update('properties', id, data);
}

export function subscribe(cb) {
  return FBRublevka.getCollectionOnSnapshot('properties', cb);
}

export function subscribeToHistory(cb) {
  return FBRublevka.getCollectionOnSnapshot('history', cb);
}

export function addToHistory(data) {
  return FBRublevka.add('history', data);
}

export function addOrUpdate(item) {
  return FBRublevka.addOrUpdate('properties', item);
}
