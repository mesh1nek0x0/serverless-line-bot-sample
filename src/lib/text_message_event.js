'use strict';

const MessageEvent = require('./message_event');

module.exports = class TextMessageEvent extends MessageEvent {
    constructor(event) {
        super(event);
        if (event.message.type !== 'text') {
            throw new Error('text type MessageEvent only');
        }
        this.text_ = event.message.text;
    }

    get text() {
        return this.text_;
    }
};
