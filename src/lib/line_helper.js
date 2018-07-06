'use strict';

module.exports = class LineHelper {
    static buildTextMessage(message) {
        const textMessage = {
            type: 'text',
            text: message,
        };
        return textMessage;
    }

    static buildImageMessage(originalUrl, thumbnailUrl) {
        const imageMessage = {
            type: 'image',
            originalContentUrl: originalUrl,
            previewImageUrl: thumbnailUrl,
        };
        return imageMessage;
    }
};
