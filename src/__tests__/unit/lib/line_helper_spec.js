'use strict';

const lineHelper = require('../../../lib/line_helper');

describe('line_helperのtest', () => {
    it('buildTextMessageが仕様通りメッセージを生成できること', () => {
        const actual = lineHelper.buildTextMessage('hoge');
        expect(actual).toEqual({
            type: 'text',
            text: 'hoge',
        });
    });

    it('buildImageMessageが仕様通りメッセージを生成できること', () => {
        const actual = lineHelper.buildImageMessage('orgUrl', 'preUrl');
        expect(actual).toEqual({
            type: 'image',
            originalContentUrl: 'orgUrl',
            previewImageUrl: 'preUrl',
        });
    });
});
