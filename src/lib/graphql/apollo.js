import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser, listUsers, getChat } from './queries'
import { createUser, createChat, createMessage, createChatMember } from './mutations'
import { onCreateUser, onUpdateUser, onCreateMessage, onUpdateMessage, onDeleteMessage, onCreateChatMember, onUpdateChatMember, onDeleteChatMember } from './subscriptions'

const GetChat = gql(getChat);
const GetUser = gql(getUser)
const ListUsers = gql(listUsers)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)
const OnCreateUser = gql(onCreateUser)
const OnUpdateUser = gql(onUpdateUser)
const OnCreateMessage = gql(onCreateMessage)
const OnUpdateMessage = gql(onUpdateMessage)
const OnDeleteMessage = gql(onDeleteMessage)
const OnCreateChatMember = gql(onCreateChatMember)
const OnUpdateChatMember = gql(onUpdateChatMember)
const OnDeleteChatMember = gql(onDeleteChatMember)

const TYPES = {
  //User
  User: 'User',
  getUser: 'getUser',
  updateUser: 'updateUser',
  //Chat
  Chat: 'Chat',
  //UserMember
  ChatMember: 'ChatMember',
  createChatMember: 'createChatMember',
  updateChatMember: 'updateChatMember',
  deleteChatMember: 'deleteChatMember',
  //Message
  Message: 'Message',
  createMessage: 'createMessage',
  updateMessage: 'updateMessage',
  deleteMessage: 'deleteMessage',
  //Medicals
  createMedical: 'createMedical',
  updateMedical: 'updateMedical',
  deleteMedical: 'deleteMedical',
}

const getUserFilter = (name, type) => ({
  type: { eq: type },
  or: [
    { given_name: { contains: `${name}` } },
    { family_name: { contains: `${name}`} },
    { username: { contains: `${name}`} },
    { email: { contains: `${name}`} },
  ]
})

const buildSchema = (input, type, action, additionalInput = {} ) => ({
  __typename: "Mutation",
  [action]: {
    ...input,
    __typename: type,
    ...additionalInput
  }
})

const getSubscriber = (processor) => (store, { subscriptionData }) => {
  const oldData = store

  const data = subscriptionData.data
  const item = data[Object.keys(data)[0]]
  const newData = processor(oldData, item)

  return newData
}

const getUpdater = (docNode, processor) => (store, { data }) => {
  const oldData = store.readQuery(docNode)

  const item = data[Object.keys(data)[0]]
  const newData = processor(oldData, item)

  return store.writeQuery({ ...docNode, data: newData })
}

const updateStoreProp = (store, storeType, data, dataType) => {
  if (!store[storeType]) return store

  let newStore = {...store}
  const itemIndex = newStore.getChat[dataType]?.items.findIndex(item => item.id === data.id)

  if (itemIndex === null) {
    newStore.getChat = { ...newStore.getChat, [dataType]: { items: [data] } }
  } else if (itemIndex === -1) {
    newStore.getChat[dataType].items = [ data, ...newStore.getChat[dataType].items ]
  } else {
    newStore.getChat[dataType].items[itemIndex] = data
  }
  return newStore
}

const removeStoreProp = (store, data, prop) => {
  if (!store.getChat) return store

  let newStore = {...store}

  const itemIndex = newStore.getChat[prop]?.items.findIndex(item => item.id === data.id)
  if (itemIndex !== -1) {
    newStore.getChat.members.items.splice(itemIndex, 1)
  }
  return newStore
}
//////////////////////////////////////////////////////////////////
//USER
//////////////////////////////////////////////////////////////////
export const updateAddUser = () => ({ document: OnCreateUser, updateQuery: getSubscriber(updateStoreUser) })
export const updateEditUser = () => ({ document: OnUpdateUser, updateQuery: getSubscriber(updateStoreUser) })
const updateStoreUserMember = (store, member) => updateStoreProp(store, 'getUser', member, 'chats')
const removeStoreUserMember = (store, member) => removeStoreProp(store, 'getUser', member, 'chats')

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

const updateStoreUser = (store, user) => {
  let newStore = {...store}

  if (!newStore.getUser) {
    newStore = { ...newStore, getUser: user }
  } else {
    newStore.getUser = { ...newStore.getUser, ...user }
  }
  return newStore
}

export const getFetchUsers = (listUsers) => async (name, type = 'RECEIVER') => {
  return await listUsers({
    variables: { filter: getUserFilter(name, type) },
    context: { serializationKey: 'LIST_USERS' },
  })
}

export const getFetchUser = (getUser) => async (id) => {
  return await getUser({
    variables: { id },
    context: { serializationKey: 'GET_USER' },
    update: getUpdater({ query: GetUser, variables: { id } }, updateStoreUser),
  })
}

export const getAddUser = (createUser) => async (attributes) => {
  const userInput = getUserInput(attributes)
  return await createUser({
    variables: { input: userInput },
    context: { serializationKey: 'CREATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPES.User, TYPES.createUser),
  })
}

export const getEditUser = (updateUser) => async (params) => {
  const userInput = getUserInput(params)
  return await updateUser({
    variables: { input: userInput },
    context: { serializationKey: 'UPDATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPES.User, TYPES.updateUser),
    update: getUpdater({ query: GetUser, variables: { id: params.id } }, updateStoreUser),
  })
}

export const getCreateUser = (actions, provider) => async (attributes, type = 'RECEIVER') => {
  const { data: { createUser: user } } = await getAddUser(actions.createUser)({ type, ...attributes})
  const { data: { createChat: chat } } = await getAddChat(actions.createChat, user)()
  // const { data: { createMessage: message } } = await getAddMessage(actions.createMessage, chat)({ type: 'ALL', text: 'Welcome', owner: provider })

  const memberInput = getChatMemberInput({chat, user})
  return await createChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.createChatMember, { user, chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id  } }, updateStoreUserMember)
  })
}

export const initializeUser = async (attributes) => {
  const userInput = getUserInput(attributes)
  const { data: { createUser: user } }  = await API.graphql(graphqlOperation(CreateUser, {input: userInput}))

  const chatInput = getChatInput({user})
  const { data: { createChat: chat } } = await API.graphql(graphqlOperation(CreateChat, {input: chatInput}))

  const memberInput = getChatMemberInput({chat, user})
  const { data: { createChatMember: member } } = await API.graphql(graphqlOperation(CreateChatMember, {input: memberInput}))

  const messageInput = getMessageInput({chat})
  await API.graphql(graphqlOperation(CreateMessage, {input: messageInput}))

  member.chat = chat
  user.chats = { items: [member], nextToken: null, } // __typename: "ModelChatMemberConnection"

  console.log({user})
  return user
}
//////////////////////////////////////////////////////////////////
//CHAT
//////////////////////////////////////////////////////////////////
const getChatInput = ({ id, name, owner, createdAt, updatedAt, user }) => ({
  id: id || uuid(),
  name: name || user.given_name,
  owner: owner || user.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const updateStoreChat = (store, chat) => {
  let newStore = {...store}

  if (!newStore.getChat) {
    newStore = { ...newStore, getChat: chat }
  } else {
    newStore.getChat = { ...newStore.getChat, ...chat }
  }
  return newStore
}

export const getFetchChat = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT' },
    update: getUpdater({ query: GetChat, variables: { id } }, updateStoreChat),
  })
}

export const getAddChat = (createChat, user) => async (params) => {
  const chatInput = getChatInput({...params, user})
  return await createChat({
    variables: { input: chatInput },
    context: { serializationKey: 'CREATE_CHAT' },
    optimisticResponse: buildSchema(chatInput, TYPES.Chat, TYPES.createChat),
  })
}
//////////////////////////////////////////////////////////////////
//MEMBER
//////////////////////////////////////////////////////////////////
const updateStoreChatMember = (store, member) => updateStoreProp(store, 'getChat', member, 'members')
const removeStoreChatMember = (store, member) => removeStoreProp(store, 'getChat', member, 'members')
export const updateAddChatMember = (owner) => ({ document: OnCreateChatMember, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMember) })
export const updateEditChatMember = (owner) => ({ document: OnUpdateChatMember, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMember) })
export const updateRemoveChatMember = (owner) => ({ document: OnDeleteChatMember, variables: { owner }, updateQuery: getSubscriber(removeStoreChatMember) })

const getChatMemberInput = ({ id, chatID, memberID, status, priviledges, createdAt, updatedAt, chat, user }) => ({
  id: id || uuid(),
  chatID: chatID || chat.id,
  memberID: memberID || user.memberID || user.id,
  status: status || 'APPROVED',
  priviledges: priviledges || ['ALL'],
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export const getFetchChatMembers = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT_MEMBERS' },
    update: getUpdater({ query: GetChat, variables: { id } }, updateStoreChatMember),
  })
}

export const getAddChatMember = (createChatMember, chat) => async (user) => {
  const memberInput = getChatMemberInput({chat, user})
  return await createChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.createChatMember, { user, chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id  } }, updateStoreChatMember),
  })
}

export const getEditChatMember = (updateChatMember, chat) => async (member) => {
  const memberInput = getChatMemberInput({...member, chat})
  return await updateChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'UPDATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.updateChatMember, { chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id  } }, updateStoreChatMember),
  })
}

export const getRemoveChatMember = (deleteChatMember, chat, owner) => async (member) => {
  const memberInput = getChatMemberInput({...member, chat, owner})
  return await deleteChatMember({
    variables: { input: { id: memberInput.id } },
    context: { serializationKey: 'DELETE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.deleteChatMember, { chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id  } }, removeStoreChatMember),
  })
}
//////////////////////////////////////////////////////////////////
//MESSAGE
//////////////////////////////////////////////////////////////////
const updateStoreChatMessage = (store, message) => updateStoreProp(store, 'getChat', message, 'messages')
const removeStoreChatMessage = (store, message) => removeStoreProp(store, 'getChat', message, 'messages')
export const updateAddMessage = (owner) => ({ document: OnCreateMessage, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMessage) })
export const updateEditMessage = (owner) => ({ document: OnUpdateMessage, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMessage) })
export const updateRemoveMessage = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: getSubscriber(removeStoreChatMessage) })

const getMessageInput = ({ id, messageChatId, text, owner, type, createdAt, updatedAt, chat }) => ({
  id: id || uuid(),
  type: type || 'ALL',
  text: text || 'Welcome',
  owner: owner || chat.owner,
  messageChatId: messageChatId || chat.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export const getFetchChatMessages = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT_MESSAGES' },
    update: getUpdater({ query: GetChat, variables: { id } }, updateStoreChatMessage),
  })
}

export const getAddMessage = (createMessage, chat) => async (params) => {
  const messageInput = getMessageInput({...params, chat})
  return await createMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'CREATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.createMessage, { chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id } }, updateStoreChatMessage),
  })
}

export const getEditMessage = (updateMessage, chat) => async (message) => {
  const messageInput = getMessageInput({...message, chat})
  return await updateMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.updateMessage, { chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id } }, updateStoreChatMessage),
  })
}

export const getRemoveMessage = (deleteMessage, chat) => async (message) => {
  const messageInput = getMessageInput({...message, chat})
  return await deleteMessage({
    variables: { input: { id: messageInput.id } },
    context: { serializationKey: 'DELETE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.deleteMessage, { chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id } }, removeStoreChatMessage),
  })
}
//////////////////////////////////////////////////////////////////
//MEDICAL
//////////////////////////////////////////////////////////////////
const updateStoreChatMedical = (store, message) => updateStoreProp(store, 'getChat', message, 'messages')
const removeStoreChatMedical = (store, message) => removeStoreProp(store, 'getChat', message, 'messages')
export const updateAddMedical = (owner) => ({ document: OnCreateMessage, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMedical) })
export const updateEditMedical = (owner) => ({ document: OnUpdateMessage, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMedical) })
export const updateRemoveMedical = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: getSubscriber(removeStoreChatMedical) })

const getMedicalInput = ({ id, messageChatId, text, owner, type, createdAt, updatedAt, chat }) => ({
  id: id || uuid(),
  type: type || 'ALL',
  text: text || 'Welcome',
  owner: owner || chat.owner,
  messageChatId: messageChatId || chat.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export const getFetchChatMedicals = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT_MEDICALS' },
    update: getUpdater({ query: GetChat, variables: { id } }, updateStoreChatMedical),
  })
}

export const getRemoveMedical = (deleteMessage, chat) => async (medical) => {
  const medicalInput = getMedicalInput({...medical, chat})
  return await deleteMessage({
    variables: { input: { id: medicalInput.id } },
    context: { serializationKey: 'DELETE_MEDICAL' },
    optimisticResponse: buildSchema(medicalInput, TYPES.Message, TYPES.deleteMessage, { chat }),
    update: getUpdater({ query: GetChat, variables: { id: chat.id } }, removeStoreChatMedical),
  })
}
