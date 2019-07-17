import { CDN } from '@config/resource';
import app from './app';

const getImageLink = (id, postfix = app.getConfig().imagePostfix, size = 1024) => `${CDN}/${id}-${postfix}-${size}`;

export default {
    get: {
        thumbnail: id => getImageLink(id, 'thumbnail', 512),
        full: id => getImageLink(id),
    },
};
