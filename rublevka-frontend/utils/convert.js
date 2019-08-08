import cdn from './cdn';

const toOG = (images = [], resolution = 1024) =>
    images.map(({ width, height, id }) => {
        const scale = height / resolution;

        return {
            url: cdn.get.full(id),
            width: width / scale,
            height: resolution,
        };
    });

export default {
    toOG,
};
