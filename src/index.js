'use strict';
const channelSecret = process.env.CHANNEL_SEACREST || 'dummuy';
const line = require('@line/bot-sdk');
const MessageBuilder = require('./lib/message_builder');

module.exports.handler = async (event, context, callback) => {
    const body = event.body;

    // Compare X-Line-Signature request header and the signature
    if (line.validateSignature(body, channelSecret, event.headers['X-Line-Signature']) === false) {
        console.log('signature not match');
        return callback(null, 'signature not match');
    }

    const client = new line.Client({
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'dummy',
        channelSecret: channelSecret,
    });

    try {
        client.replyMessage(
            JSON.parse(event.body).events[0].replyToken,
            MessageBuilder.build(JSON.parse(event.body).events[0])
        );
    } catch (err) {
        console.log(err.message);
        // error handling
        return callback(null, 'end with failure');
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
