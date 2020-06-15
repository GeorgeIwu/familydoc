import { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'

import {createUser, createChat, createMessage, createChatMember} from '../graphql/mutations'

const CreateUser = gql(createUser);
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)

// import AppSyncConfig from '../../aws-exports'
// const AWS = require('aws-sdk')
// AWS.config.region = AppSyncConfig.aws_appsync_region
// const poolData = { UserPoolId : AppSyncConfig.aws_user_pools_id, ClientId : AppSyncConfig.aws_user_pools_web_client_id }
// var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
// const getUserAttributes = async (username) => new Promise((resolve, reject) => {
//   var userData = { Username : username, Pool : userPool }
//   var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

//   cognitoUser.getUserAttributes((error, result) => {
//     if (error) reject (error)
//     resolve(result.reduce((acc, item, index) => {
//       acc[item.getName()] = item.getValue()
//       return acc
//     }), {})
//   })
// })
// attributes = await getUserAttributes(attributes.username)

const getUserInput = (attributes) => ({
  input: {
    id: attributes.sub || uuid(),
    email: attributes.email,
    username: attributes.email,
    phone_number: attributes.phone_number,
    family_name: attributes.family_name,
    given_name: attributes.given_name,
    type: attributes.nickname,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

const getChatInput = (user) => ({
  input: {
    id: uuid(),
    name: user.given_name,
    owner: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

const getMessageInput = (chat) => ({
  input: {
    id: uuid(),
    text: 'Welcome',
    messageChatId: chat.id,
    type: 'ALL',
    owner: chat.owner,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

const getChatMemberInput = (chat, user) => ({
  input: {
    id: uuid(),
    chatID: chat.id,
    memberID: user.id,
    createdAt: new Date(),
  }
})

const initializeUser = async (attributes) => {
  if (!attributes) return null

  const user = await API.graphql(graphqlOperation(CreateUser, getUserInput(attributes)))
  const chat = await API.graphql(graphqlOperation(CreateChat, getChatInput(user.data.createUser)))
  const message = await API.graphql(graphqlOperation(CreateMessage, getMessageInput(chat.data.createChat)))
  const member = await API.graphql(graphqlOperation(CreateChatMember, getChatMemberInput(chat.data.createChat, user.data.createUser)))
  console.log({message, member})

  return user
}

export default initializeUser

