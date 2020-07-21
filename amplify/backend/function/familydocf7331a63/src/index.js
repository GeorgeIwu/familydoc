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

const getMemberPriviledges = async (chatID, memberID) => {
    const params = {
        TableName: memberTable,
        IndexName: "byChat",
        KeyConditionExpression: 'chatID = :chatID AND memberID = :memberID',
        ExpressionAttributeValues: {
            ':chatID': chatID,
            ':memberID': memberID
        },
    };
    const result = await dbClient.query(params).promise()
    const member = result.Items[0]

    const priviledges = member ? member.priviledges : ['']
    return priviledges
}

const getChatMessages = async (chatID, priveledgesObject) => {
    const params = {
        TableName: messageTable,
        IndexName: "byMessageChatId",
        KeyConditionExpression: 'messageChatId = :chatID',
        FilterExpression: "#type in ("+Object.keys(priveledgesObject).toString()+ ")",
        ExpressionAttributeNames: { "#type": "type" },
        ExpressionAttributeValues: {
            ...priveledgesObject,
            ':chatID': chatID,
        },
    };
    const result = await dbClient.query(params).promise()

    const messages = {
        nextToken: '2',
        items: result.Items
    }
    return messages
}

const updateMessageType = async (messageID, messageType) => {
    const params = {
        TableName: messageTable,
        Key: {
            id: messageID,
        },
        UpdateExpression: 'set type = :messageType',
        ExpressionAttributeValues: {
            ':messageType': messageType,
        },
        ReturnValues: "ALL_NEW"
    };
    const result = await dbClient.update(params).promise()
    console.log({result})

    return result.Attributes
}

exports.handler = async (event, context) => {
    console.log(`event.fieldName`, event.fieldName)

    if (event.fieldName === 'messages') {
        const priviledges = await getMemberPriviledges(event.source.id, event.identity.sub)
        const priveledgesObject = priviledges.reduce((obj, value, i) => {
            obj[":priviledge"+i+""] = value
            return obj
        }, {})

        const response = await getChatMessages(event.source.id, priveledgesObject)
        context.done(null, response)
    }

    if (event.fieldName === 'updateMessageType') {
        const priviledges = await getMemberPriviledges(event.arguments.chatID, event.arguments.memberID)

        if (priviledges.indexOf("ALL") > -1) {
            const response = await updateMessageType(event.arguments.id, event.arguments.type)
            context.done(null, response)
        }
        context.done('error', null)
    }
};

