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
    var params = {
        KeyConditionExpression: '#chatID = :chatID AND #memberID = :memberID',
        ExpressionAttributeNames: {
            "#chatID": "chatID",
            "#memberID": "memberID"
        },
        ExpressionAttributeValues: {
            ':chatID': event.source.id,
            ':memberID': event.identity.sub
        },
        TableName: memberTable
    };
    var result = await dbClient.query(params).promise()
    console.log({event, context, result})


    return 'Obins'
};

