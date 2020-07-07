/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiFamilydocChatMemberTableName = process.env.API_FAMILYDOC_CHATMEMBERTABLE_NAME
var apiFamilydocChatMemberTableArn = process.env.API_FAMILYDOC_CHATMEMBERTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocChatMemberTableName = process.env.API_FAMILYDOC_CHATMEMBERTABLE_NAME
var apiFamilydocChatMemberTableArn = process.env.API_FAMILYDOC_CHATMEMBERTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocMessageTableName = process.env.API_FAMILYDOC_MESSAGETABLE_NAME
var apiFamilydocMessageTableArn = process.env.API_FAMILYDOC_MESSAGETABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const region = process.env.REGION
const dbClient = new AWS.DynamoDB.DocumentClient({region})
const memberTable = process.env.API_FAMILYDOC_CHATMEMBERTABLE_NAME
const messageTable = process.env.API_FAMILYDOC_MESSAGETABLE_NAME

exports.handler = async (event, context) => {
    let params = {
        TableName: memberTable,
        IndexName: "byChat",
        KeyConditionExpression: 'chatID = :chatID AND memberID = :memberID',
        ExpressionAttributeValues: {
            ':chatID': event.source.id,
            ':memberID': event.identity.sub
        },
    };
    let result = await dbClient.query(params).promise()

    const priviledges = result.Items[0].priviledges
    const priveledgesObject = priviledges.reduce((obj, value, i) => {
        obj[":priviledge"+i+""] = value
        return obj
    }, {})

    params = {
        TableName: messageTable,
        IndexName: "byMessageChatId",
        KeyConditionExpression: 'messageChatId = :chatID',
        FilterExpression: "#type in ("+Object.keys(priveledgesObject).toString()+ ")",
        ExpressionAttributeNames: { "#type": "type" },
        ExpressionAttributeValues: {
            ...priveledgesObject,
            ':chatID': event.source.id,
        },
    };
    result = await dbClient.query(params).promise()

    const messages = {
        nextToken: '2',
        items: result.Items
    }
    console.log({messages})
    return messages
};

