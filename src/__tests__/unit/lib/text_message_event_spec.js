'use strict';
const TextMessageEvent = require('../../../lib/text_message_event');

describe('text_message_eventのテスト', () => {
    it('LINEのMessageEventがtextタイプであればparseできること', () => {
        const actual = new TextMessageEvent({
            type: 'message',
            message: { type: 'text', id: 1234, text: 'hello' },
        });

        expect(actual.type).toBe('message');
        expect(actual.id).toBe(1234);
        expect(actual.text).toBe('hello');
    });

    it('LINEのMessageEventがtextタイプ以外のとき例外が発生すること', () => {
        expect(() => {
            new TextMessageEvent({
                type: 'message',
                message: { type: 'image', id: 1234 },
            });
        }).toThrow('text type MessageEvent only');
    });
});
