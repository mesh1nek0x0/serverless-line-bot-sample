'use strict';
const MessageBuilder = require('../../../lib/message_builder');

describe('message_builderのtest', () => {
    it('text型のMessageEventでtextのレスポンスメッセージが生成されること', () => {
        const msg = MessageBuilder.build({
            type: 'message',
            message: { type: 'text', id: 1234, text: 'hello' },
        });
        expect(msg.type).toBe('text');
    });

    it('未定義のMessageEventでは、textのレスポンスメッセージが生成されること', () => {
        const msg = MessageBuilder.build({
            type: 'message',
            message: { type: 'image', id: 1234 },
        });
        expect(msg.type).toBe('text');
    });

    it('MessageEventっぽい違うオブジェクトが渡された場合、textのレスポンスメッセージが生成されること', () => {
        // 使い方を間違えた場合を想定
        const msg = MessageBuilder.build({
            type: 'message',
            message: { id: 1234 },
        });
        expect(msg.type).toBe('text');
    });
});
