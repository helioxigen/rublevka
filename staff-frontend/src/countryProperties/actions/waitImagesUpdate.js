import isEqual from 'lodash/isEqual';
import { apiPath } from '../constants/defaults';
import { loadElement } from '../../jq-redux-api/actions';

export default data =>
  new Promise((resolve) => {
    const { id, images: prevImages } = data;
    const waitTime = 7000;
    const oneDelay = 500;
    const maxCount = Math.ceil(waitTime / oneDelay);
    const nextTick = async (currCount) => {
      const result = await loadElement(apiPath, id);
      const { images } = result;

      if (!isEqual(prevImages, images)) {
        resolve({ isUpdated: true });
      } else if (currCount < maxCount) {
        setTimeout(() => nextTick(currCount + 1), oneDelay);
      } else {
        resolve({ isUpdated: false });
      }
    };

    nextTick(0);
  });
