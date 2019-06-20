import { FBRublevka } from '../../firebase';

export default function getLastExportResultRecord() {
  return FBRublevka.getCollection('exportResults')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty){
        return {}
      }
      return snapshot.docs.pop().data();
    })

}