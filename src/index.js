'use strict';
const crypto = require('crypto');
const channelSecret = process.env.CHANNEL_SEACREST;
const { Client } = require('@line/bot-sdk');

module.exports.handler = async (event, context, callback) => {
    const body = event.body;
    const signature = crypto
        .createHmac('SHA256', channelSecret)
        .update(body)
        .digest('base64');
    // Compare X-Line-Signature request header and the signature
    if (event.headers['X-Line-Signature'] !== signature) {
        return callback(null, 'signature not match');
    }

    const client = new Client({
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
        channelSecret: channelSecret,
    });

    const message = {
        type: 'text',
        text: JSON.parse(event.body).events[0].message.text,
    };

    client
        .replyMessage(JSON.parse(event.body).events[0].replyToken, message)
        .then(() => {
            console.log('end with success');
        })
        .catch(err => {
            console.log(err.message);
            // error handling
        });

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
