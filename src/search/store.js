import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getUser, listUsers } from '../_lib/graphql/queries'
import { createUser, createChat, createMessage, createChatMember } from '../_lib/graphql/mutations'
import { buildSchema, getUserFilter, getUpdater, updateStoreProp } from '../_lib/utils'

export const GetUser = gql(getUser)
export const ListUsers = gql(listUsers)
export const CreateUser = gql(createUser)
export const CreateChat = gql(createChat)
export const CreateMessage = gql(createMessage)
export const CreateChatMember = gql(createChatMember)

const TYPES = {
  User: 'User',
  Chat: 'Chat',
  getUser: 'getUser',
  createUser: 'createUser',
  createChat: 'createChat',
  ChatMember: 'ChatMember',
  createMessage: 'createMessage',
  createChatMember: 'createChatMember',

}

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

const getChatMemberInput = ({ id, chatID, userID, status, priviledges, createdAt, updatedAt, chat, user }) => ({
  id: id || uuid(),
  chatID: chatID || chat.id,
  userID: userID || user.id,
  status: status || 'APPROVED',
  priviledges: priviledges || ['ALL'],
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

const updateStoreUserMember = (store, member) => updateStoreProp(store, 'getUser', member, 'chats')

export const getSearch = (listUsers) => async (name, type = 'RECEIVER') => {
  return await listUsers({
    variables: { filter: getUserFilter(name, type) },
    context: { serializationKey: 'LIST_USERS' },
  })
}

export const getCreateUser = (actions, userID) => async (attributes, type = 'RECEIVER') => {

  const userInput = getUserInput({ type, ...attributes })
  const { data: { createUser: user } } = await actions.createUser({
    variables: { input: userInput },
    context: { serializationKey: 'CREATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPES.User, TYPES.createUser),
  })

  const chatInput = getChatInput({ user })
  const { data: { createChat: chat } } = await actions.createChat({
    variables: { input: chatInput },
    context: { serializationKey: 'CREATE_CHAT' },
    optimisticResponse: buildSchema(chatInput, TYPES.Chat, TYPES.createChat),
  })

  const memberInput = getChatMemberInput({chat, user})
  await actions.createChatMember({
    variables: { input: {...memberInput, userID} },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
  })

  await actions.createMessage({
    variables: { input: getMessageInput({ type: 'ALL', text: 'Welcome', owner: userID, chat }) },
    context: { serializationKey: 'CREATE_CHAT_MESSAGE' }
  })

  await actions.createChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.createChatMember, { member: user, chat }),
    update: getUpdater(updateStoreUserMember, TYPES.createChatMember, { query: GetUser, variables: { id: userID  } })
  })

  return user
}
