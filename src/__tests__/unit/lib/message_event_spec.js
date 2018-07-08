'use strict';
const MessageEvent = require('../../../lib/message_event');

describe('message_eventのテスト', () => {
    it('LINEのMessageEventであればparseできること', () => {
        const actual = new MessageEvent({
            type: 'message',
            message: { id: 1234, text: 'hello', type: 'text' },
        });

        expect(actual.type).toBe('text');
        expect(actual.id).toBe(1234);
    });

    it('LINEのMessageEventでない場合、例外が発生すること', () => {
        expect(() => {
            new MessageEvent({});
        }).toThrow('cannot generate message event');
    });
});
