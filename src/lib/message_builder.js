'use strict';

const TextMessageEvent = require('./text_message_event');
const LineHelper = require('./line_helper');

module.exports = class MessageBuilder {
    static build(event) {
        const type = !event.message.type ? 'unknown' : event.message.type;

        let message = {};
        if (type === 'text') {
            const textMessage = new TextMessageEvent(event);
            if (textMessage.text === 'confirm') {
                message = LineHelper.buildConfirmTemplateMessage([
                    {
                        type: 'message',
                        label: 'Yes',
                        text: 'yes',
                    },
                    {
                        type: 'message',
                        label: 'No',
                        text: 'no',
                    },
                ]);
            } else {
                message = LineHelper.buildTextMessage(textMessage.text);
            }
        } else {
            message = LineHelper.buildTextMessage('unknow type was recieved...');
        }
        return message;
    }
};
