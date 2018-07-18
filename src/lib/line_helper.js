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

    static buildConfirmTemplateMessage(choices, confirmText = 'Are you sure?') {
        const confirmMessage = {
            type: 'template',
            altText: 'this is a confirm template',
            template: {
                type: 'confirm',
                text: confirmText,
                actions: choices,
            },
        };
        return confirmMessage;
    }
};
