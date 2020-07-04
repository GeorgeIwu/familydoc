/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiFamilydocChatTableName = process.env.API_FAMILYDOC_CHATTABLE_NAME
var apiFamilydocChatTableArn = process.env.API_FAMILYDOC_CHATTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocChatTableName = process.env.API_FAMILYDOC_CHATTABLE_NAME
var apiFamilydocChatTableArn = process.env.API_FAMILYDOC_CHATTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocMessageTableName = process.env.API_FAMILYDOC_MESSAGETABLE_NAME
var apiFamilydocMessageTableArn = process.env.API_FAMILYDOC_MESSAGETABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const region = process.env.REGION
const messageStorage = process.env.API_FAMILYDOC_MESSAGETABLE_NAME
const storeClient = AWS.DynamoDB.DocumentClient({region})

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};