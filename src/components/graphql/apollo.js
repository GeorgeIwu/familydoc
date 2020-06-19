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

const getInput = (data, typeName) => {
  const { __typename, ...input } = typeName ? data[typeName] : data
  return input
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

const subscriber = (dataType, ActionType) => (store, { subscriptionData }) => {
  const oldData = store

  const item = subscriptionData.data[dataType]
  const action = actions[ActionType || dataType]
  const newData = action(oldData, item)

  return newData
}

const updater = ({query, variables}, dataType, ActionType) => (store, { data }) => {
  const oldData = store.readQuery({ query, variables })
  console.log({store, data, dataType})

  const item = data[dataType]
  const action = actions[ActionType || dataType]
  const newData = action(oldData, item)

  return store.writeQuery({ query, variables, data: newData })
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

const saveUsers = (store, users) => {
  let newStore = {...store}

  if (!newStore.listUsers) {
    newStore = { ...newStore, listUsers: users }
  } else {
    newStore.listUsers.items = [ ...users.items, ...newStore.listUsers.items ]
  }
  return newStore
}

const saveUsersItem = (store, user) => {
  let newStore = saveUser(store, user)

  const itemIndex = newStore?.listUsers?.items.findIndex(item => item.id === user.id)

  if (itemIndex === null) {
    newStore = { ...newStore, listUsers: { items: [user] } }
  } else if (itemIndex === -1) {
    newStore.listUsers.items = [ user, ...newStore.listUsers.items ]
  } else {
    newStore.listUsers.items[itemIndex] = user
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

const saveChats = (store, chats) => {
  let newStore = {...store}

  if (!newStore.listChats) {
    newStore = { ...newStore, listChats: chats }
  } else {
    newStore.listChats.items = [ ...chats.items, ...newStore.listChats.items ]
  }
  return newStore
}

const saveChatsItem = (store, chat) => {
  let newStore = saveChat(store, chat)
  const itemIndex = newStore?.listChats?.items.findIndex(item => item.id === chat.id)

  if (itemIndex === null) {
    newStore = { ...newStore, listChats: { items: [chat] } }
  } else if (itemIndex === -1) {
    newStore.listChats.items = [ chat, ...newStore.listChats.items ]
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
    newStore.getChat.messages.items = [ ...messages.items, ...newStore.getChat.messages.items ]
  }
  return newStore
}

const saveMessage = (store, message) => {
  let newStore = {...store}
  const itemIndex = newStore?.getChat?.messages?.items.findIndex(item => item.id === message.id)

  if (itemIndex === null) {
    newStore.getChat = { ...newStore.getChat, messages: { items: [message] } }
  } else if (itemIndex === -1) {
    newStore.getChat.messages.items = [ message, ...newStore.getChat.messages.items ]
  } else {
    newStore.getChat.messages.items[itemIndex] = message
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
    newStore.getChat.medicals.items = [ ...medicals.items, ...newStore.getChat.medicals.items ]
  }
  return newStore
}

const saveMedical = (store, medical) => {
  let newStore = {...store}

  const itemIndex = newStore?.getChat?.medicals?.items.findIndex(item => item.id === medical.id)

  if (itemIndex === null) {
    newStore.getChat = { ...newStore.getChat, medicals: { items: [medical] } }
  } else if (itemIndex === -1) {
    newStore.getChat.medicals.items = [ medical, ...newStore.getChat.medicals.items ]
  } else {
    newStore.getChat.medicals.items[itemIndex] = medical
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
    newStore.getChat.members.items = [ ...members.items, ...newStore.getChat.members.items ]
  }
  return newStore
}

const saveChatMember = (store, member) => {
  let newStore = {...store}

  const itemIndex = newStore?.getChat?.members?.items.findIndex(item => item.id === member.id)

  if (itemIndex === null) {
    newStore.getChat = { ...newStore.getChat, members: { items: [member] } }
  } else if (itemIndex === -1) {
    newStore.getChat.members.items = [ member, ...newStore.getChat.members.items ]
  } else {
    newStore.getChat.members.items[itemIndex] = member
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

const getUserSchema = ({ id, sub, email, username, phone_number, family_name, given_name, nickname = 'RECEIVER', type, createdAt, updatedAt }, owner, typeName = 'createUser') => ({
  __typename: "Mutation",
  [typeName]: {
    __typename: "User",
    id: id || sub || uuid(),
    type: type || nickname,
    username: username || email,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    email, phone_number, family_name, given_name,
  }
})

const getChatSchema = ({ id, name, owner, createdAt, updatedAt }, user, typeName = 'createChat') => ({
  __typename: "Mutation",
  [typeName]: {
    __typename: "Chat",
    id: id || uuid(),
    name: name || user.given_name,
    owner: owner || user.id,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
  }
})

const getMessageSchema = ({ id, messageChatId, text, owner, type, createdAt, updatedAt }, chat, typeName = 'createMessage') => ({
  __typename: "Mutation",
  [typeName]: {
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

const getChatMemberSchema = ({ id , createdAt, updatedAt }, chat, user, typeName = 'createChatMember') => ({
  __typename: "Mutation",
  [typeName]: {
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

export const getCreateUser = async (attributes) => {
  const user = await API.graphql(graphqlOperation(CreateUser, getUserSchema(attributes)))
  const chat = await API.graphql(graphqlOperation( CreateChat, getInput(getChatSchema({}, user.data.createUser)) ))
  const message = await API.graphql(graphqlOperation( CreateMessage, getInput(getMessageSchema({}, chat.data.createChat)) ))
  const member = await API.graphql(graphqlOperation(CreateChatMember, getInput(getChatMemberSchema({}, chat.data.createChat, user.data.createUser)) ))

  console.log({user, chat, message, member})
  return user
}

export const getAddReceiver = (actions, owner) => async (attributes) => {
  const { data: { createUser } } = await getAddUser(actions.createUser, owner)({ ...attributes, type: 'RECEIVER' })
  const { data: { createChat } } = await getAddChat(actions.createChat, owner)(createUser)
  const { data: { createMessage } } = await getAddMessage(actions.createMessage, createChat, owner)({ type: 'ALL', text: 'Welcome' })
  const { data: { createChatMember } } = await getAddChatMember(actions.createChatMember, createChat, owner)(createUser)

  console.log({createUser, createChat, createMessage, createChatMember})
  return createUser
}

export const getAddProvider = (actions, owner) => async (attributes) => {
  const { data: { createUser } } = await getAddUser(actions.createUser, owner)({ ...attributes, type: 'PROVIDER' })
  const { data: { createChat } } = await getAddChat(actions.createChat, owner)(createUser)
  const { data: { createMessage } } = await getAddMessage(actions.createMessage, createChat, owner)({ type: 'ALL', text: 'Welcome' })

  console.log({createUser, createChat, createMessage})
  return createUser
}

export const getFetchUsers = (listProviders, owner) => async (name, type = 'RECEIVER') => {
  return await listProviders({
    variables: { filter: getUserFilter(name, type) },
    context: { serializationKey: 'LIST_USERS' },
    // optimisticResponse: null,
    update: updater({ query: ListUsers, variables: { type } }, TYPE.listUsers)
  })
}

export const getFetchUser = (getUser) => async (id) => {
  return await getUser({
    variables: { id },
    context: { serializationKey: 'GET_USER' },
    update: updater({ query: GetUser, variables: { id } }, TYPE.getUser),
  })
}

export const getFetchChats = (listChats, owner) => async () => {
  return await listChats({
    variables: { owner },
    context: { serializationKey: 'LIST_CHATS' },
    update: updater({ query: ListChats, variables: { owner } }, TYPE.listChats),
  })
}

export const getFetchChat = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT' },
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat),
  })
}

export const getFetchMessages = (getMessages) => async (id) => {
  return await getMessages({
    variables: { id },
    context: { serializationKey: 'GET_MESSAGES' },
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMessages),
  })
}

export const getFetchMedicals = (getMedicals) => async (id) => {
  return await getMedicals({
    variables: { id },
    context: { serializationKey: 'GET_MEDICALS' },
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMedicals),
  })
}

export const getFetchChatMembers = (getChatMembers) => async (id) => {
  return await getChatMembers({
    variables: { id },
    context: { serializationKey: 'GET_MEMBERS' },
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listChatMembers),
  })
}

export const getAddUser = (createUser, owner) => async (user) => {
  const optimisticResponse = getUserSchema(user, owner, TYPE.createUser)
  return await createUser({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.createUser) },
    context: { serializationKey: 'CREATE_USER' },
    update: updater({ query: ListUsers, variables: { type: user.type } }, TYPE.createUser),
  })
}

export const getEditUser = (updateUser, owner) => async (user) => {
  const optimisticResponse = getUserSchema(user, owner, TYPE.updateUser)
  return await updateUser({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.updateUser) },
    context: { serializationKey: 'UPDATE_USER' },
    update: updater({ query: GetUser, variables: { id: user.id } }, TYPE.updateUser),
  })
}

export const getAddChat = (createChat, chat, owner) => async (user) => {
  const optimisticResponse = getChatSchema(chat, user, TYPE.createChat)
  return await createChat({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.createChat) },
    context: { serializationKey: 'CREATE_CHAT' },
    update: updater({ query: ListChats, variables: { owner } }, TYPE.createChat),
  })
}

export const getAddMessage = (createMessage, chat, owner) => async (message) => {
  const optimisticResponse = getMessageSchema({...message, owner}, chat, TYPE.createMessage)
  return await createMessage({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.createMessage) },
    context: { serializationKey: 'CREATE_MESSAGE' },
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createMessage),
  })
}

export const getEditMessage = (updateMessage, chat, owner) => async (message) => {
  const optimisticResponse = getMessageSchema(message, chat, TYPE.updateMessage)
  return await updateMessage({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.updateMessage) },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateMessage),
  })
}

export const getRemoveMessage = (deleteMessage, chat, owner) => async (message) => {
  const optimisticResponse = getMessageSchema(message, chat, TYPE.deleteMessage)
  return await deleteMessage({
    optimisticResponse,
    variables: { input: { id: getInput(optimisticResponse, TYPE.deleteMessage).id } },
    context: { serializationKey: 'DELETE_MESSAGE' },
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage),
  })
}

export const getRemoveMedical = (deleteMessage, chat, owner) => async (medical) => {
  const optimisticResponse = getMessageSchema(medical, chat, TYPE.deleteMessage)
  return await deleteMessage({
    optimisticResponse,
    variables: { input: { id: getInput(optimisticResponse, TYPE.deleteMessage).id } },
    context: { serializationKey: 'DELETE_MEDICAL' },
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage, TYPE.deleteMedical),
  })
}

export const getAddChatMember = (createChatMember, chat, owner) => async (user) => {
  const optimisticResponse = getChatMemberSchema(chat, user, TYPE.createChatMember)
  return await createChatMember({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.createChatMember) },
    context: { serializationKey: 'CREATE_MEMBER' },
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createChatMember),
  })
}

export const getEditChatMember = (updateChatMember, chat, owner) => async (member) => {
  const optimisticResponse = getChatMemberSchema(member, chat, TYPE.updateChatMember)
  return await updateChatMember({
    optimisticResponse,
    variables: { input: getInput(optimisticResponse, TYPE.updateChatMember) },
    context: { serializationKey: 'CREATE_MEMBER' },
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateChatMember),
  })
}

export const getRemoveChatMember = (deleteChatMember, chat, owner) => async (member) => {
  const optimisticResponse = getChatMemberSchema(member, chat, TYPE.deleteChatMember)
  return await deleteChatMember({
    optimisticResponse,
    variables: { input: { id: getInput(optimisticResponse, TYPE.deleteChatMember).id } },
    context: { serializationKey: 'DELETE_MEMBER' },
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

const actions = {
  getUser: saveUser,
  listUsers: saveUsers,
  createUser: saveUsersItem,
  onCreateUser: saveUsersItem,
  updateUser: saveUser,
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

const TYPE = Object.keys(actions).reduce((acc, key) => { acc[key] = key; return acc }, {})
