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

const buildSchema = (input, type, action, additionalInput = {} ) => ({
  __typename: "Mutation",
  [action]: {
    ...input,
    __typename: type,
    ...additionalInput
  }
})

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

const getMessageInput = ({ id, messageChatId, text, type, createdAt, updatedAt, chat }) => ({
  id: id || uuid(),
  text: text || 'Welcome',
  type: type || 'ALL',
  messageChatId: messageChatId || chat.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const getChatMemberInput = ({ id, chatID, memberID, status, priviledges, createdAt, updatedAt, chat, user }) => ({
  id: id || uuid(),
  chatID: chatID || chat.id,
  memberID: memberID || user.id,
  status: status || 'APPROVED',
  priviledges: priviledges || ['ALL'],
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export const getCreateUser = async (attributes) => {
  const userInput = getUserInput(attributes)
  const user = await API.graphql(graphqlOperation(CreateUser, {input: userInput}))

  const chatInput = getChatInput({user: user.data.createUser})
  const chat = await API.graphql(graphqlOperation(CreateChat, {input: chatInput}))

  const messageInput = getMessageInput({chat: chat.data.createChat})
  const message = await API.graphql(graphqlOperation(CreateMessage, {input: messageInput}))

  const memberInput = getChatMemberInput({chat: chat.data.createChat, user: user.data.createUser})
  const member = await API.graphql(graphqlOperation(CreateChatMember, {input: memberInput}))

  chat.messages = [message]
  member.chat = chat
  member.member = user
  user.chats = [member]

  console.log({user})
  return user
}

export const getAddReceiver = (actions, provider) => async (attributes) => {
  const { data: { createUser: user } } = await getAddUser(actions.createUser)({ type: 'RECEIVER', ...attributes})
  const { data: { createChat: chat } } = await getAddChat(actions.createChat, user)()
  const { data: { createMessage: message } } = await getAddMessage(actions.createMessage, chat)({ type: 'ALL', text: 'Welcome', owner: provider })
  const { data: { createChatMember: member } } = await getAddChatMember(actions.createChatMember, chat)({ user, memberID: provider})

  console.log({user, chat, message, member})
  return user
}

export const getAddProvider = (actions) => async (attributes) => {
  const { data: { createUser: user } } = await getAddUser(actions.createUser)({ type: 'PROVIDER', ...attributes })
  const { data: { createChat: chat } } = await getAddChat(actions.createChat, user)()
  const { data: { createMessage: message } } = await getAddMessage(actions.createMessage, chat)({ type: 'ALL', text: 'Welcome' })

  console.log({user, chat, message})
  return user
}

export const getFetchUsers = (listUsers) => async (name, type = 'RECEIVER') => {
  return await listUsers({
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

export const getAddUser = (createUser) => async (attributes) => {
  const userInput = getUserInput(attributes)
  return await createUser({
    variables: { input: userInput },
    context: { serializationKey: 'CREATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPE.User, TYPE.createUser),
    update: updater({ query: ListUsers, variables: { type: attributes.type } }, TYPE.createUser),
  })
}

export const getEditUser = (updateUser) => async (params) => {
  const userInput = getUserInput(params)
  return await updateUser({
    variables: { input: userInput },
    context: { serializationKey: 'UPDATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPE.User, TYPE.updateUser),
    update: updater({ query: GetUser, variables: { id: params.id } }, TYPE.updateUser),
  })
}

export const getAddChat = (createChat, user) => async (params) => {
  const chatInput = getChatInput({...params, user})
  return await createChat({
    variables: { input: chatInput },
    context: { serializationKey: 'CREATE_CHAT' },
    optimisticResponse: buildSchema(chatInput, TYPE.Chat, TYPE.createChat),
    // update: updater({ query: GetUser, variables: { owner } }, TYPE.createChat),
  })
}

export const getAddMessage = (createMessage, chat) => async (params) => {
  const messageInput = getMessageInput({...params, chat})
  return await createMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'CREATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPE.Message, TYPE.createMessage, { chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createMessage),
  })
}

export const getEditMessage = (updateMessage, chat) => async (message) => {
  const messageInput = getMessageInput({...message, chat})
  return await updateMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPE.Message, TYPE.updateMessage, { chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateMessage),
  })
}

export const getRemoveMessage = (deleteMessage, chat) => async (message) => {
  const messageInput = getMessageInput({...message, chat})
  return await deleteMessage({
    variables: { input: { id: messageInput.id } },
    context: { serializationKey: 'DELETE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPE.Message, TYPE.deleteMessage, { chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage),
  })
}

export const getRemoveMedical = (deleteMessage, chat) => async (medical) => {
  const medicalInput = getMessageInput({...medical, chat})
  return await deleteMessage({
    variables: { input: { id: medicalInput.id } },
    context: { serializationKey: 'DELETE_MEDICAL' },
    optimisticResponse: buildSchema(medicalInput, TYPE.Message, TYPE.deleteMessage, { chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage, TYPE.deleteMedical),
  })
}

export const getAddChatMember = (createChatMember, chat) => async (user) => {
  const memberInput = getChatMemberInput({chat, user})
  return await createChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPE.ChatMember, TYPE.createChatMember, { user, chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createChatMember),
  })
}

export const getEditChatMember = (updateChatMember, chat) => async (member) => {
  const memberInput = getChatMemberInput({...member, chat})
  return await updateChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'UPDATE_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPE.ChatMember, TYPE.updateChatMember, { chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateChatMember),
  })
}

export const getRemoveChatMember = (deleteChatMember, chat, owner) => async (member) => {
  const memberInput = getChatMemberInput({...member, chat, owner})
  return await deleteChatMember({
    variables: { input: { id: memberInput.id } },
    context: { serializationKey: 'DELETE_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPE.ChatMember, TYPE.deleteChatMember, { chat }),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteChatMember),
  })
}

export const updateAddUser = () => ({ document: OnCreateUser, updateQuery: subscriber(TYPE.onCreateUser) })
export const updateEditUser = () => ({ document: OnUpdateUser, updateQuery: subscriber(TYPE.onUpdateUser) })
export const updateAddMessage = (owner) => ({ document: OnCreateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMessage) })
export const updateEditMessage = (owner) => ({ document: OnUpdateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateMessage) })
export const updateRemoveMessage = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage) })
export const updateRemoveMedical = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage, TYPE.deleteMedical) })
export const updateAddChatMember = (owner) => ({ document: OnCreateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onCreateChatMember) })
export const updateEditChatMember = (owner) => ({ document: OnUpdateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateChatMember) })
export const updateRemoveChatMember = (owner) => ({ document: OnDeleteChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteChatMember) })

const actions = {
  User: () => {},
  Chat: () => {},
  Message: () => {},
  ChatMember: () => {},
  getUser: saveUser,
  listUsers: saveUsers,
  createUser: saveUsersItem,
  onCreateUser: saveUsersItem,
  updateUser: saveUser,
  onUpdateUser: saveUser,
  listMessages: saveMessages,
  listMedicals: saveMedicals,
  listChatMembers: saveChatMembers,
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
