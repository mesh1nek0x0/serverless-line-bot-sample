'use strict';

module.exports = class LineHelper {
    static buildTextMessage(message) {
        const textMessage = {
            type: 'text',
            text: message,
        };
        return textMessage;
    }
};
