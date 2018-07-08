'use strict';

module.exports = class MessageEvent {
    constructor(event) {
        if (!event.type || event.type !== 'message') {
            throw new Error('cannot generate message event');
        }
        this.type_ = event.message.type;
        this.id_ = event.message.id;
    }

    get type() {
        return this.type_;
    }

    get id() {
        return this.id_;
    }
};
