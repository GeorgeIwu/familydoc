import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { createUser, createChat, createMessage , createMember } from '../graphql/mutations'
import { buildSchema, getUpdater, updateStoreMembers } from '../utils/helpers'

const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateMember = gql(createMember)

const TYPES = {
  User: 'User',
  Chat: 'Chat',
  Member: 'Member',
  Message: 'Message',
  createUser: 'createUser',
  createChat: 'createChat',
  createMember: 'createMember',
  createMessage: 'createMessage',
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

const useCreate = (userID) => {
  const [createUser, { data: newUserData }] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMember] = useMutation(CreateMember)
  const [createMessage] = useMutation(CreateMessage)

  const addUser = async (attributes, type = 'RECEIVER') => {
    const userInput = getUserInput({ type, ...attributes })
    const { data: { createUser: user } } = await createUser({
      variables: { input: userInput },
      context: { serializationKey: 'CREATE_USER' },
      optimisticResponse: buildSchema(userInput, TYPES.User, TYPES.createUser),
    })
    const chatInput = getChatInput({ user })
    const { data: { createChat: chat } } = await createChat({
      variables: { input: chatInput },
      context: { serializationKey: 'CREATE_CHAT' },
      optimisticResponse: buildSchema(chatInput, TYPES.Chat, TYPES.createChat),
    })
    const memberInput = getMemberInput({chat, user})
    await createMember({
      variables: { input: {...memberInput, userID} },
      context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    })
    await createMember({
      variables: { input: memberInput },
      context: { serializationKey: 'CREATE_CHAT_MEMBER' },
      optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.createMember, { member: user, chat }),
      // update: getUpdater(updateStoreUserMember, { query: GetUser, variables: { id: userID  } })
    })
    await createMessage({
      variables: { input: getMessageInput({ type: 'ALL', text: 'Welcome', owner: userID, chat }) },
      context: { serializationKey: 'CREATE_CHAT_MESSAGE' }
    })
  }

  return [newUserData, { addUser }]
}

export { useCreate }
