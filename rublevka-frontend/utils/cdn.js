import { CDN } from '@config/resource';
import app from './app';
import optional from './optional';

const use = (name, ...args) => `-/${name}/${args.map(c => encodeURIComponent(c)).join('/')}`;

const createUcareLink = (id, ...exts) => optional.str('https://ucarecdn.com', id, ...exts).join('/') + '/';

const getImageLink = (id, postfix = app.config.name, size = 1024) => {
    if (id.startsWith('CLOUD:')) {
        return createUcareLink(
            id.replace('CLOUD:', ''),
            size > 512 && use('overlay', app.config.cdnWatermarkUUID, '50%x50%', 'center'),
            use('resize', size),
            use('format', 'auto')
        );
    }

    return `${CDN}/${id}-${postfix}-${size}`;
};

export default {
    get: {
        thumbnail: (id, size = 256) => getImageLink(id, 'thumbnail', size),
        full: id => getImageLink(id),
    },
};
