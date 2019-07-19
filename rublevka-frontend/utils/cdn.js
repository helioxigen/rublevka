import { CDN } from '@config/resource';
import app from './app';

const getImageLink = (id, postfix = app.getConfig().imagePostfix, size = 1024) => `${CDN}/${id}-${postfix}-${size}`;

export default {
    get: {
        thumbnail: (id, size = 512) => getImageLink(id, 'thumbnail', size),
        full: id => getImageLink(id),
    },
};
