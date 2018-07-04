'use strict';
const index = require('../../index');
const sinon = require('sinon');
const sampleEvent = require('../fixtures/event.json');
const line = require('@line/bot-sdk');

describe('index_spec', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('正常系のテスト', () => {
        it('正常系のテスト', async () => {
            const callback = sinon.stub();
            sinon.stub(line, 'validateSignature').callsFake(() => {
                return true;
            });
            sinon.stub(line.Client.prototype, 'replyMessage').callsFake(() => {
                return Promise.resolve({ text: 'ok with stub' });
            });

            await index.handler(sampleEvent, {}, callback);
            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            // see: jest await async sample
            // https://facebook.github.io/jest/docs/en/tutorial-async.html
            expect.assertions(2);
        });
    });

    describe('異常系のテスト', () => {
        it('signatureが正しくない場合、そこで処理を終了すること', async () => {
            const callback = sinon.stub();
            sinon.stub(line, 'validateSignature').callsFake(() => {
                return false;
            });

            await index.handler(sampleEvent, {}, callback);
            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toBe('signature not match');
            // see: jest await async sample
            // https://facebook.github.io/jest/docs/en/tutorial-async.html
            expect.assertions(3);
        });

        it('replyMessageに失敗した場合、そこで処理を終了すること', async () => {
            const callback = sinon.stub();
            sinon.stub(line, 'validateSignature').callsFake(() => {
                return true;
            });
            sinon.stub(line.Client.prototype, 'replyMessage').callsFake(() => {
                throw new Error('ng with stub');
            });

            await index.handler(sampleEvent, {}, callback);
            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toBe('end with failure');
            // see: jest await async sample
            // https://facebook.github.io/jest/docs/en/tutorial-async.html
            expect.assertions(3);
        });
    });
});
