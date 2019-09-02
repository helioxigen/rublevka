const fs = require('fs-extra');
const mime = require('mime');

const checkMimeType = (fileUrl = '', acceptHeader = [], allowedMimeTypes, targetType) => {
    const mimeType = mime.getType(fileUrl);

    const hasMimeType = allowedMimeTypes.includes(mimeType);
    const acceptsTargetType = acceptHeader.includes(targetType);

    return { allowed: hasMimeType, extension: mime.getExtension(acceptsTargetType ? targetType : mimeType) };
};

const createCache = (cacheDir, clearCache) => {
    const cachePathExists = fs.existsSync(cacheDir);

    if (!cachePathExists) {
        fs.mkdirSync(cacheDir);
    }

    if (cachePathExists && clearCache) {
        fs.emptyDirSync(cacheDir);
    }

    return new Set();
};

const cacheExists = filePath =>
    new Promise(resolve => {
        fs.exists(filePath, resolve);
    });

module.exports = {
    checkMimeType,
    createCache,
    cacheExists,
};
