import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser, listUsers, getChat, listChats } from './queries'
import { createUser, createChat, createMessage, createChatMember } from './mutations'
import { onCreateUser, onUpdateUser, onCreateChat, onUpdateChat, onCreateMessage, onUpdateMessage, onDeleteMessage, onCreateChatMember, onUpdateChatMember, onDeleteChatMember } from './subscriptions'

const GetChat = gql(getChat);
const ListChats = gql(listChats);
const GetUser = gql(getUser)
const ListUsers = gql(listUsers)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)
const OnCreateUser = gql(onCreateUser)
const OnUpdateUser = gql(onUpdateUser)
const OnCreateChat = gql(onCreateChat)
const OnUpdateChat = gql(onUpdateChat)
const OnCreateMessage = gql(onCreateMessage)
const OnUpdateMessage = gql(onUpdateMessage)
const OnDeleteMessage = gql(onDeleteMessage)
const OnCreateChatMember = gql(onCreateChatMember)
const OnUpdateChatMember = gql(onUpdateChatMember)
const OnDeleteChatMember = gql(onDeleteChatMember)


const getInput = async (data) => {
  const { __typename, ...input } = data
  return input
}

const subscriber = (dataType, ActionType) => (store, { subscriptionData }) => {
  const oldData = store

  const item = subscriptionData.data[dataType]
  const action = actions[ActionType || dataType]
  const newData = action(oldData, item)

  return newData
}

const updater = ({query, variables}, dataType, ActionType) => (store, { data }) => {
  const oldData = store.readQuery({ query, variables })

  const item = data[dataType]
  const action = actions[ActionType || dataType]
  const newData = action(oldData, item)

  return store.writeQuery({ query, variables, data: newData })
}

const saveUsers = (store, users) => {
  let newStore = {...store}

  if (!newStore.listUsers) {
    newStore = { ...newStore, listUsers: users }
  } else {
    newStore = [ ...users, ...newStore.listUsers.items ]
  }
  return newStore
}

const saveUser = (store, user) => {
  let newStore = {...store}

  if (!newStore.getUser) {
    newStore = { ...newStore, getUser: user }
  } else {
    newStore.getUser = { ...newStore.getUser, ...user }
  }
  return newStore
}

const saveUsersItem = (store, user) => {
  let newStore = saveUser(store, user)

  const itemIndex = newStore.listUsers.items.findIndex(item => item.id === user.id)
  if (itemIndex === -1) {
    newStore.listUsers.items = [user, ...newStore.listUsers.items]
  } else {
    newStore.listUsers.items[itemIndex] = user
  }
  return newStore
}

const saveChats = (store, chats) => {
  let newStore = {...store}

  if (!newStore.listChats) {
    newStore = { ...newStore, listChats: chats }
  } else {
    newStore = [ ...chats, ...newStore.listChats.items ]
  }
  return newStore
}

const saveChat = (store, chat) => {
  let newStore = {...store}

  if (!newStore.getChat) {
    newStore = { ...newStore, getChat: chat }
  } else {
    newStore.getChat = { ...newStore.getChat, ...chat }
  }
  return newStore
}

const saveChatsItem = (store, chat) => {
  let newStore = saveChat(store, chat)

  const itemIndex = newStore.listChats.items.findIndex(item => item.id === chat.id)
  if (itemIndex === -1) {
    newStore.listChats.items = [chat, ...newStore.listChats.items]
  } else {
    newStore.listChats.items[itemIndex] = chat
  }
  return newStore
}

const saveMessages = (store, messages) => {
  let newStore = {...store}

  if (!newStore.getChat.messages) {
    newStore.getChat = { ...newStore.getChat, messages }
  } else {
    newStore.getChat.messages = [ ...messages, ...newStore.getChat.messages ]
  }
  return newStore
}

const saveMessage = (store, message) => {
  let newStore = {...store}

  if (!newStore.getChat.messages) {
    newStore.getChat = { ...newStore.getChat, messages: [message] }
  } else {
    newStore.getChat.messages = [ message, ...newStore.getChat.messages ]
  }
  return newStore
}

const purgeMessage = (store, message) => {
  let newStore = {...store}

  const itemIndex = newStore.getChat.messages.items.findIndex(item => item.id === message.id)
  if (itemIndex !== -1) {
    newStore.getChat.messages.items.splice(itemIndex, 1)
  }
  return newStore
}

const saveMedicals = (store, medicals) => {
  let newStore = {...store}

  if (!newStore.getChat.medicals) {
    newStore.getChat = { ...newStore.getChat, medicals }
  } else {
    newStore.getChat.medicals = [ ...medicals, ...newStore.getChat.medicals ]
  }
  return newStore
}

const saveMedical = (store, medical) => {
  let newStore = {...store}

  if (!newStore.getChat.medical) {
    newStore.getChat = { ...newStore.getChat, medicals: [medical] }
  } else {
    newStore.getChat.medicals = [ medical, ...newStore.getChat.medicals ]
  }
  return newStore
}

const purgeMedical = (store, medical) => {
  let newStore = {...store}

  const itemIndex = newStore.getChat.medicals.items.findIndex(item => item.id === medical.id)
  if (itemIndex !== -1) {
    newStore.getChat.medicals.items.splice(itemIndex, 1)
  }
  return newStore
}

const saveChatMembers = (store, members) => {
  let newStore = {...store}

  if (!newStore.getChat.members) {
    newStore.getChat = { ...newStore.getChat, members }
  } else {
    newStore.getChat.members = [ ...members, ...newStore.getChat.members ]
  }
  return newStore
}

const saveChatMember = (store, member) => {
  let newStore = {...store}

  if (!newStore.getChat.medical) {
    newStore.getChat = { ...newStore.getChat, members: [member] }
  } else {
    newStore.getChat.members = [ member, ...newStore.getChat.members ]
  }
  return newStore
}

const purgeChatMember = (store, member) => {
  let newStore = {...store}

  const itemIndex = newStore.getChat.members.items.findIndex(item => item.id === member.id)
  if (itemIndex !== -1) {
    newStore.getChat.members.items.splice(itemIndex, 1)
  }
  return newStore
}

const getUserSchema = ({ id, sub, email, username, phone_number, family_name, given_name, nickname, type, createdAt, updatedAt }, owner) => ({
  __typename: "Mutation",
  createUser: {
    __typename: "User",
    id: id || sub || uuid(),
    type: type || nickname || 'USER',
    username: username || email,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    email, phone_number, family_name, given_name,
  }
})

const getChatSchema = ({ id, name, owner, createdAt, updatedAt }, user) => ({
  __typename: "Mutation",
  createChat: {
    __typename: "Chat",
    id: id || uuid(),
    name: name || user.given_name,
    owner: owner || user.id,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
  }
})

const getMessageSchema = ({ id, messageChatId, text, owner, type, createdAt, updatedAt }, chat) => ({
  __typename: "Mutation",
  createMessage: {
    __typename: "Message",
    id: id || uuid(),
    text: text || 'Welcome',
    type: type || 'ALL',
    messageChatId: messageChatId || chat.id,
    owner: owner || chat.owner,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
  }
})

const getChatMemberSchema = ({ id , createdAt, updatedAt }, chat, user) => ({
  __typename: "Mutation",
  createChatMember: {
    __typename: "ChatMember",
    id: id || uuid(),
    chat,
    member: user,
    chatID: chat.id,
    memberID: user.id,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
  }
})


const actions = {
  getUser: saveUser,
  listUsers: saveUsers,
  createUser: saveUsersItem,
  updateUser: saveUser,
  onCreateUser: saveUsersItem,
  onUpdateUser: saveUser,
  getChat: saveChat,
  listChats: saveChats,
  listMessages: saveMessages,
  listMedicals: saveMedicals,
  listChatMembers: saveChatMembers,
  createChat: saveChatsItem,
  updateChat: saveChat,
  onCreateChat: saveChatsItem,
  onUpdateChat: saveChat,
  createMessage: saveMessage,
  updateMessage: saveMessage,
  onCreateMessage: saveMessage,
  deleteMessage: purgeMessage,
  onUpdateMessage: saveMessage,
  onDeleteMessage: purgeMessage,
  createMedical: saveMedical,
  updateMedical: saveMedical,
  deleteMedical: purgeMedical,
  onDeleteMedical: purgeMedical,
  createChatMember: saveChatMember,
  updateChatMember: saveChatMember,
  deleteChatMember: purgeChatMember,
  onCreateChatMember: saveChatMember,
  onUpdateChatMember: saveChatMember,
  onDeleteChatMember: purgeChatMember,
}

const TYPE = {
  getUser: 'getUser',
  listUsers: 'listUsers',
  createUser: 'createUser',
  updateUser: 'updateUser',
  onCreateUser: 'onCreateUser',
  onUpdateUser: 'onUpdateUser',
  getChat: 'getChat',
  listChats: 'listChats',
  listMessages: 'listMessages',
  listMedicals: 'listMedicals',
  listChatMembers: 'listChatMembers',
  createChat: 'createChat',
  updateChat: 'updateChat',
  onCreateChat: 'onCreateChat',
  onUpdateChat: 'onUpdateChat',
  createMessage: 'createMessage',
  deleteMessage: 'deleteMessage',
  updateMessage: 'updateMessage',
  onCreateMessage: 'onCreateMessage',
  onUpdateMessage: 'onUpdateMessage',
  onDeleteMessage: 'onDeleteMessage',
  createMedical: 'createMedical',
  updateMedical: 'updateMedical',
  deleteMedical: 'deleteMedical',
  onDeleteMedical: 'onDeleteMedical',
  createChatMember: 'createChatMember',
  updateChatMember: 'updateChatMember',
  deleteChatMember: 'deleteChatMember',
  onCreateChatMember: 'onCreateChatMember',
  onUpdateChatMember: 'onUpdateChatMember',
  onDeleteChatMember: 'onDeleteChatMember',
}

// const TYPEZ = Object.keys(actions).reduce((acc, key) => acc[key] = key , {})
// console.log({TYPEZ})

export const getFetchUsers = (listUsers, owner) => async () => {
  return await listUsers({
    variables: { owner },
    context: { serializationKey: 'LIST_USERS' },
    optimisticResponse: null,
    update: updater({ query: ListUsers, variables: { owner } }, TYPE.listUsers),
  })
}

export const getFetchUser = (getUser) => async (id) => {
  return await getUser({
    variables: { id },
    context: { serializationKey: 'GET_USER' },
    optimisticResponse: null,
    update: updater({ query: GetUser, variables: { id } }, TYPE.getUser),
  })
}

export const getFetchChats = (listChats, owner) => async () => {
  return await listChats({
    variables: { owner },
    context: { serializationKey: 'LIST_CHATS' },
    optimisticResponse: null,
    update: updater({ query: ListChats, variables: { owner } }, TYPE.listChats),
  })
}

export const getFetchChat = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat),
  })
}

export const getFetchMessages = (getMessages) => async (id) => {
  return await getMessages({
    variables: { id },
    context: { serializationKey: 'GET_MESSAGES' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMessages),
  })
}

export const getFetchMedicals = (getMedicals) => async (id) => {
  return await getMedicals({
    variables: { id },
    context: { serializationKey: 'GET_MEDICALS' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMedicals),
  })
}

export const getFetchChatMembers = (getChatMembers) => async (id) => {
  return await getChatMembers({
    variables: { id },
    context: { serializationKey: 'GET_MEMBERS' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listChatMembers),
  })
}

export const getAddUser = (createUser, owner) => async (user) => {
  const input = { owner, name: user.given_name, createdAt: new Date(), updatedAt: new Date() }
  return await createUser({
    variables: { input },
    context: { serializationKey: 'CREATE_USER' },
    optimisticResponse: getUserSchema(input, owner),
    update: updater({ query: ListUsers, variables: { owner } }, TYPE.createUser),
  })
}

export const getEditUser = (updateUser, owner) => async (user) => {
  const input = { ...user, updatedAt: new Date() }
  return await updateUser({
    variables: { input },
    context: { serializationKey: 'UPDATE_USER' },
    optimisticResponse: getUserSchema(input, owner),
    update: updater({ query: ListUsers, variables: { owner } }, TYPE.updateUser),
  })
}

export const getInitUsersItem = (actions, owner) => async (attributes) => {
  const { data: { createUser } } = await getAddUser(actions.createUser, owner)(attributes)
  const { data: { createChat } } = await getAddUser(actions.createChat, owner)(createUser)
  const { data: { createMessage } } = await getAddMessage(actions.createMessage, createChat, owner)({ type: 'ALL', text: 'Welcome' })
  const { data: { createChatMember } } = await getAddChatMember(actions.createChatMember, createChat, owner)(createUser)

  console.log({createUser, createChat, createMessage, createChatMember})
  return createUser
}

export const getInitUser = async (attributes) => {
  const user = await API.graphql(graphqlOperation(CreateUser, getUserSchema(attributes)))
  const chat = await API.graphql(graphqlOperation( CreateChat, getInput(getChatSchema({}, user.data.createUser)) ))
  const message = await API.graphql(graphqlOperation( CreateMessage, getInput(getMessageSchema({}, chat.data.createChat)) ))
  const member = await API.graphql(graphqlOperation(CreateChatMember, getInput(getChatMemberSchema({}, chat.data.createChat, user.data.createUser)) ))

  console.log({user, chat, message, member})
  return user
}

export const getAddChat = (createChat, chat, owner) => async (user) => {
  const input = { owner, name: user.given_name, createdAt: new Date(), updatedAt: new Date() }
  return await createChat({
    variables: { input },
    context: { serializationKey: 'CREATE_CHAT' },
    optimisticResponse: getChatSchema(input, chat),
    update: updater({ query: ListChats, variables: { owner } }, TYPE.createChat),
  })
}

export const getAddMessage = (createMessage, chat, owner) => async ({ text, type }) => {
  const input = { text, messageChatId: chat.id, type, owner, createdAt: new Date(), updatedAt: new Date() }
  return await createMessage({
    variables: { input },
    context: { serializationKey: 'CREATE_MESSAGE' },
    optimisticResponse: getMessageSchema(input, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createMessage),
  })
}

export const getEditMessage = (updateMessage, chat, owner) => async ({ __typename, ...rest }) => {
  const input = { ...rest, updatedAt: new Date() }
  return await updateMessage({
    variables: { input },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    optimisticResponse: getMessageSchema(input, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateMessage),
  })
}

export const getRemoveMessage = (deleteMessage, chat, owner) => async (message) => {
  const input = { id: message.id }
  return await deleteMessage({
    variables: { input },
    context: { serializationKey: 'DELETE_MESSAGE' },
    optimisticResponse: getMessageSchema(message, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage),
  })
}

export const getRemoveMedical = (deleteMessage, chat, owner) => async (message) => {
  const input = { id: message.id }
  return await deleteMessage({
    variables: { input },
    context: { serializationKey: 'DELETE_MEDICAL' },
    optimisticResponse: getMessageSchema(message, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage, TYPE.deleteMedical),
  })
}

export const getAddChatMember = (createChatMember, chat, owner) => async (user) => {
  const input = { chatID: chat.id, memberID: user.id, createdAt: new Date() }
  return await createChatMember({
    variables: { input },
    context: { serializationKey: 'CREATE_MEMBER' },
    optimisticResponse: getChatMemberSchema(chat, user),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createChatMember),
  })
}

export const getEditChatMember = (updateChatMember, chat, owner) => async (member) => {
  const input = { ...member }
  return await updateChatMember({
    variables: { input },
    context: { serializationKey: 'CREATE_MEMBER' },
    optimisticResponse: getChatMemberSchema(member, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateChatMember),
  })
}

export const getRemoveChatMember = (deleteChatMember, chat, owner) => async (member) => {
  const input = { id: member.id }
  return await deleteChatMember({
    variables: { input },
    context: { serializationKey: 'DELETE_MEMBER' },
    optimisticResponse: getChatMemberSchema(member, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteChatMember),
  })
}

export const updateAddUser = () => ({ document: OnCreateUser, updateQuery: subscriber(TYPE.onCreateUser) })
export const updateEditUser = () => ({ document: OnUpdateUser, updateQuery: subscriber(TYPE.onUpdateUser) })
export const updateAddChat = (owner) => ({ document: OnCreateChat, variables: { owner }, updateQuery: subscriber(TYPE.onCreateChat) })
export const updateEditChat = (owner) => ({ document: OnUpdateChat, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateChat) })
export const updateAddMessage = (owner) => ({ document: OnCreateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMessage) })
export const updateEditMessage = (owner) => ({ document: OnUpdateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateMessage) })
export const updateRemoveMessage = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage) })
export const updateRemoveMedical = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage, TYPE.deleteMedical) })
export const updateAddChatMember = (owner) => ({ document: OnCreateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onCreateChatMember) })
export const updateEditChatMember = (owner) => ({ document: OnUpdateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateChatMember) })
export const updateRemoveChatMember = (owner) => ({ document: OnDeleteChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteChatMember) })

// const getUserFilters = (name) => ({
//   or: [
//     { given_name: { contains: `${name}` } },
//     { family_name: { contains: `${name}`} },
//     { username: { contains: `${name}`} },
//     { email: { contains: `${name}`} },
//   ]
// })
