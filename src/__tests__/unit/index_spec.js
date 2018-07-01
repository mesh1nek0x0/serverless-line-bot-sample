'use strict';
const index = require('../../index');
const sinon = require('sinon');

describe('index_spec', () => {
    it('正常系のテスト', async () => {
        const callback = sinon.stub();
        await index.handler({}, {}, callback);
        expect(callback.callCount).toBe(1);
        // see: jest await async sample
        // https://facebook.github.io/jest/docs/en/tutorial-async.html
        expect.assertions(1);
    });
});
