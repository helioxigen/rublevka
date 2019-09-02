import { CDN } from '@config/resource';
import app from './app';

const getImageLink = (id, postfix = app.config.name, size = 1024) => {
    if (id.startsWith('CLOUD:')) {
        const watermark = size > 512 ? '/-/overlay/7bdb5192-4a14-4cca-bda9-3ab59670f78f/30%25x30%25/center' : '';

        return `https://ucarecdn.com/${id.replace('CLOUD:', '')}${watermark}/-/resize/${size}/image.jpg`;
    }

    return `${CDN}/${id}-${postfix}-${size}`;
};

export default {
    get: {
        thumbnail: (id, size = 256) => getImageLink(id, 'thumbnail', size),
        full: id => getImageLink(id),
    },
};
