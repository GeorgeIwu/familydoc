// import AWS from 'aws-sdk'
import { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'

import AppSyncConfig from '../../aws-exports'
import {createUser, createChat, createMessage} from '../graphql/mutations'

const AWS = require('aws-sdk')
AWS.config.region = AppSyncConfig.aws_appsync_region
const poolData = { UserPoolId : AppSyncConfig.aws_user_pools_id, ClientId : AppSyncConfig.aws_user_pools_web_client_id }
var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

const CreateUser = gql(createUser);
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)

const getUserInput = (attributes) => ({
  input: {
    id: uuid(),
    email: attributes.email,
    username: attributes.email,
    phone_number: attributes.phone_number,
    first_name: attributes.first_name,
    given_name: attributes.given_name,
    type: attributes.nickname,
  }
})

const getChatInput = (user) => ({
  input: {
    id: uuid(),
    name: user.given_name,
    owner: user.id,
    createdAt: new Date()
  }
})

const getMessageInput = (chat) => ({
  input: {
    id: uuid(),
    text: 'Welcome',
    messageChatId: chat.id,
    type: 'DRUG',
    owner: chat.owner,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

const getUserAttributes = async (username) => new Promise((resolve, reject) => {
  var userData = { Username : username, Pool : userPool }
  var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

  cognitoUser.getUserAttributes((error, result) => {
    if (error) reject (error)
    resolve(result.reduce((acc, item, index) => {
      acc[item.getName()] = item.getValue()
      return acc
    }), {})
  })
})

const initializeUser = async (attributes) => {
  attributes = await getUserAttributes(attributes.username)
  console.log({attributes})
  const user = await API.graphql(graphqlOperation(CreateUser, getUserInput(attributes)))
  console.log({user})
  const chat = await API.graphql(graphqlOperation(CreateChat, getChatInput(user)))
  console.log({chat})
  const message = await API.graphql(graphqlOperation(CreateMessage, getMessageInput(chat)))
  console.log({message})
}

// const initializeUserd = async (attributes, actions, createChat, createMessage) => {
//   if (!attributes) return null
//   console.log({attributes})
//   const user = await actions.addUser(attributes)
//   console.log({user})
//   const chat = await chatsActions(user.id, {createChat}).addChat({name: 'Bot Man'})
//   console.log({chat})
//   const message = await chatActions(user.id, chat, {createMessage}).addMessage({text: 'Welcome', type: 'DRUG'})
//   console.log({message})
// }

export default initializeUser

