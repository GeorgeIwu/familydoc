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
var apiFamilydocMemberTableName = process.env.API_FAMILYDOC_MEMBERTABLE_NAME
var apiFamilydocMemberTableArn = process.env.API_FAMILYDOC_MEMBERTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocChatTableName = process.env.API_FAMILYDOC_CHATTABLE_NAME
var apiFamilydocChatTableArn = process.env.API_FAMILYDOC_CHATTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocMemberTableName = process.env.API_FAMILYDOC_MEMBERTABLE_NAME
var apiFamilydocMemberTableArn = process.env.API_FAMILYDOC_MEMBERTABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT
var apiFamilydocMessageTableName = process.env.API_FAMILYDOC_MESSAGETABLE_NAME
var apiFamilydocMessageTableArn = process.env.API_FAMILYDOC_MESSAGETABLE_ARN
var apiFamilydocGraphQLAPIIdOutput = process.env.API_FAMILYDOC_GRAPHQLAPIIDOUTPUT

Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk')
const region = process.env.REGION
const dbClient = new AWS.DynamoDB.DocumentClient({region})
const chatTable = process.env.API_FAMILYDOC_CHATTABLE_NAME
const memberTable = process.env.API_FAMILYDOC_MEMBERTABLE_NAME
const messageTable = process.env.API_FAMILYDOC_MESSAGETABLE_NAME

const getChats = async (userID, chatName) => {
    const memberParams = {
        TableName: memberTable,
        IndexName: "byUser",
        KeyConditionExpression: 'userID = :userID',
        ExpressionAttributeValues: {
            ':userID': userID
        },
    };
    const memberResult = await dbClient.query(memberParams).promise()

    const chatResults = await Promise.all(memberResult.Items.map(async (member) => {
        const result = await dbClient.get({
            TableName: chatTable,
            Key: {
                "id": member.chatID
            },
        }).promise()
        return result.Item
    }))

    const chats = { nextToken: '2', items: chatResults }

    return chats
}


const getChatMembers = async (chatID, priveledgesObject) => {
    const statusObject = { ':status0': 'OFFERED', ':status1': 'REQUESTED', ':status2': 'APPROVED' }
    const params = {
        TableName: memberTable,
        IndexName: "byChat",
        KeyConditionExpression: 'chatID = :chatID',
        FilterExpression: "#status in ("+Object.keys(statusObject).toString()+")",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: {
            ...statusObject,
            ':chatID': chatID,
        },
    };

    const result = await dbClient.query(params).promise()

    const members = {
        nextToken: '2',
        items: result.Items
    }
    return members
}

const getChatMessages = async (chatID, priveledgesObject) => {
    const params = {
        TableName: messageTable,
        IndexName: "byChatID",
        KeyConditionExpression: 'chatID = :chatID',
        FilterExpression: "#type in ("+Object.keys(priveledgesObject).toString()+")",
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

const getMemberPriviledges = async (chatID, userID) => {
    const params = {
        TableName: memberTable,
        IndexName: "byChat",
        KeyConditionExpression: 'chatID = :chatID AND userID = :userID',
        ExpressionAttributeValues: {
            ':chatID': chatID,
            ':userID': userID
        },
    };
    const result = await dbClient.query(params).promise()
    const member = result.Items[0]

    const priviledges = member ? member.priviledges : ['']
    return priviledges
}

exports.handler = async (event, context) => {
    console.log({event})

    if (event.fieldName === 'listChats') {
        const userID = event.arguments.userID
        const name = event.arguments.name
        const response = await getChats(userID, name)

        context.done(null, response)
    }

    if (event.fieldName === 'listMembers') {
        const chatID = event.arguments.chatID
        const priviledges = await getMemberPriviledges(chatID, event.identity.sub)
        const priveledgesObject = priviledges.reduce((obj, value, i) => {
            obj[":priviledge"+i+""] = value
            return obj
        }, {})

        const response = await getChatMembers(chatID, priveledgesObject)
        context.done(null, response)
    }

    if (event.fieldName === 'listMessages') {
        const chatID = event.arguments.chatID
        const priviledges = await getMemberPriviledges(chatID, event.identity.sub)
        const priveledgesObject = priviledges.reduce((obj, value, i) => {
            obj[":priviledge"+i+""] = value
            return obj
        }, {})

        const response = await getChatMessages(chatID, priveledgesObject)
        context.done(null, response)
    }

    if (event.fieldName === 'updateMessageType') {
        const chatID = event.arguments.chatID
        const priviledges = await getMemberPriviledges(chatID, event.identity.sub)

        if (priviledges.indexOf("ALL") > -1) {
            const response = await updateMessageType(event.arguments.id, event.arguments.type)
            context.done(null, response)
        }
        context.done('error', null)
    }
};
