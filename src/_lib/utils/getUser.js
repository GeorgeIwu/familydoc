import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import { createUser, createChat, createMessage , createMember } from '../graphql/mutations'

const GetUser = gql(getUser)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateMember = gql(createMember)

const getUserInput = ({ id, sub, email, username, phone_number, family_name, given_name, nickname = 'RECEIVER', type, createdAt, updatedAt }) => ({
  email,
  given_name,
  family_name,
  phone_number,
  type: type || nickname,
  id:  id || sub || uuid(),
  username: username || email,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const getChatInput = ({ id, name, owner, createdAt, updatedAt, user }) => ({
  id: id || uuid(),
  name: name || user.given_name,
  owner: owner || user.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const getMessageInput = ({ id, chatID, text, owner, type, createdAt, updatedAt, chat }) => ({
  id: id || uuid(),
  type: type || 'ALL',
  text: text || 'Welcome',
  owner: owner || chat.owner,
  chatID: chatID || chat.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const getMemberInput = ({ id, chatID, userID, status, priviledges, createdAt, updatedAt, chat, user }) => ({
  id: id || uuid(),
  chatID: chatID || chat.id,
  userID: userID || user.id,
  status: status || 'APPROVED',
  priviledges: priviledges || ['ALL'],
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export default async (auth) => {
  const id = auth?.attributes?.sub
  if (!id) return {error: 'invalid user'}
  let appUser

  const { data: { getUser } }  = await API.graphql(graphqlOperation(GetUser, {id}))
  appUser = getUser

  if (!appUser || !appUser.id) {
    const userInput = getUserInput(auth.attributes)
    const { data: { createUser: user } }  = await API.graphql(graphqlOperation(CreateUser, {input: userInput}))

    const chatInput = getChatInput({user})
    const { data: { createChat: chat } } = await API.graphql(graphqlOperation(CreateChat, {input: chatInput}))

    const messageInput = getMessageInput({chat})
    await API.graphql(graphqlOperation(CreateMessage, {input: messageInput}))

    const memberInput = getMemberInput({chat, user})
    await API.graphql(graphqlOperation(CreateMember, {input: memberInput}))
    appUser = user
  }

  return appUser
}
