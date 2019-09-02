import { CDN } from '@config/resource';
import app from './app';

const getImageLink = (id, postfix = app.config.name, size = 1024) => {
    if (id.startsWith('CLOUD:')) {
        return `https://ucarecdn.com/${id.replace('CLOUD:', '')}/-/resize/${size}/image.jpg`;
    }

    return `${CDN}/${id}-${postfix}-${size}`;
};

export default {
    get: {
        thumbnail: (id, size = 256) => getImageLink(id, 'thumbnail', size),
        full: id => getImageLink(id),
    },
};
