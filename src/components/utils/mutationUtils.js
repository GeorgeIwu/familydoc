import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import initializeUser from './initializeUser'
import {listUsers, listChats, getChat} from '../graphql/queries'

const ListUsers = gql(listUsers);
const ListChats = gql(listChats);
const GetChat = gql(getChat);

const createUser = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.listUsers.items.findIndex(user => user.id === item.id)
  if (itemIndex === -1) {
    newStore.listUsers.items = [item, ...newStore.listUsers.items]
  } else {
    newStore.listUsers.items[itemIndex] = item
  }
  return newStore
}

const updateUser = (store, item) => {
  const newStore = {...store}
  const user = newStore.getUser
  if (user) {
    newStore.getUser = item
  } else {
    newStore.getUser = item
  }
  return newStore
}

const createdUser = ({ email, username, phone_number, first_name, given_name, type }, id) => ({
  __typename: "Mutation",
  createUser: {
    __typename: "User",
    email, username, phone_number, first_name, given_name, type,
    id: id || uuid(),
  }
})

const updatedUser = ({ id, email, username, phone_number, first_name, given_name, type }) => ({
  __typename: "Mutation",
  updateUser: {
    __typename: "User",
    email, username, phone_number, first_name, given_name, type,
    id,
  }
})

const createChat = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.listChats.items.findIndex(chat => chat.id === item.id)
  if (itemIndex === -1) {
    newStore.listChats.items = [item, ...newStore.listChats.items]
  } else {
    newStore.listChats.items[itemIndex] = item
  }
  return newStore
}

const updateChat = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.listChats.items.findIndex(chat => chat.id === item.id)
  if (itemIndex !== -1) {
    newStore.listChats.items[itemIndex] = item
  }
  return newStore
}

const createdChat = ({name, owner, type, createdAt, updatedAt}) => ({
  __typename: "Mutation",
  createChat: {
    __typename: "Chat",
    name, owner, type, createdAt, updatedAt,
    id: uuid(),
  }
})

const updatedChat = ({id, name, owner, type, createdAt, updatedAt}) => ({
  __typename: "Mutation",
  createChat: {
    __typename: "Chat",
    name, owner, type, createdAt, updatedAt,
    id,
  }
})

const createMessage = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.getChat.messages.items.findIndex(message => message.id === item.id)
  if (itemIndex === -1) {
    newStore.getChat.messages.items = [item, ...newStore.getChat.messages.items]
  } else {
    newStore.getChat.messages.items[itemIndex] = item
  }
  return newStore
}

const updateMessage = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.getChat.messages.items.findIndex(message => message.id === item.id)
  if (itemIndex !== -1) {
    newStore.getChat.messages.items[itemIndex] = item
  }
  return newStore
}

const deleteMessage = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.getChat.messages.items.findIndex(message => message.id === item.id)
  if (itemIndex !== -1) {
    newStore.getChat.messages.items.splice(itemIndex, 1)
  }
  return newStore
}

const createdMessage = ({text, owner, type, createdAt, updatedAt}, chat) => ({
  __typename: "Mutation",
  createMessage: {
    __typename: "Message",
    chat, owner, text, type, createdAt, updatedAt,
    id: uuid(),
  }
})

const updatedMessage = ({id, text, owner, type, createdAt, updatedAt}, chat) => ({
  __typename: "Mutation",
  updateMessage: {
    __typename: "Message",
    chat, owner, text, type, createdAt, updatedAt,
    id,
  }
})

const deletedMessage = ({ id, text, owner, type, createdAt, updatedAt }, chat) => ({
  __typename: "Mutation",
  deleteMessage: {
    __typename: "Message",
    chat, text, owner, type, createdAt, updatedAt,
    id,
  }
})

const actions = {
  createUser: createUser,
  updateUser: updateUser,
  onCreateUser: createUser,
  onUpdateUser: updateUser,
  createChat: createChat,
  updateChat: updateChat,
  onCreateChat: createChat,
  onUpdateChat: updateChat,
  createMessage: createMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage,
  onCreateMessage: createMessage,
  onUpdateMessage: updateMessage,
  onDeleteMessage: deleteMessage,
}

const TYPE = {
  createUser: 'createUser',
  updateUser: 'updateUser',
  onCreateUser: 'onCreateUser',
  onUpdateUser: 'onUpdateUser',
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
}


const updater = (type, {query, variables}) => (store, { data }) => {
  const oldData = store.readQuery({ query, variables })

  const item = data[type]
  const action = actions[type]
  const newData = action(oldData, item)

  return store.writeQuery({ query, variables, data: newData })
}

const subscriber = (type) => (store, { subscriptionData }) => {
  const oldData = store

  const item = subscriptionData.data[type]
  const action = actions[type]
  const newData = action(oldData, item)

  return newData
}

const initializer = async (input, createUser, createChat, createMessage, owner) => {
  if (!input) return null

  const newUser = createdUser(input)
  // const owner = newUser.createUser.id
  const chatInput = { name: newUser.createUser.first_name, owner, createdAt: new Date(), updatedAt: new Date() }
  const newChat = createdChat(chatInput)
  const {__typename, ...chat} = newChat.createChat
  const messageInput = { text: 'Welcome', type: 'ALL', messageChatId: chat.id, owner, createdAt: new Date(), updatedAt: new Date() }
  const newMessage = createdMessage(messageInput, chat)

  createUser({ variables: { input }, context: { serializationKey: 'CREATE_USER' }, optimisticResponse: newUser,
    update: updater(TYPE.createUser, { query: ListUsers, variables: { owner } }),
  })
  createChat({ variables: { input: chatInput }, context: { serializationKey: 'CREATE_CHAT' }, optimisticResponse: newChat,
    update: updater(TYPE.createChat, { query: ListChats }),
  })
  createMessage({ variables: { input: messageInput }, context: { serializationKey: 'CREATE_MESSAGE' }, optimisticResponse: newMessage,
    update: updater(TYPE.createMessage, { query: GetChat, variables: { id: chat.id } }),
  })

  return {newUser, newChat, newMessage}
}


export {
  TYPE,
  updater,
  subscriber,
  initializer,
  createdUser,
  updatedUser,
  createdChat,
  updatedChat,
  createdMessage,
  updatedMessage,
  deletedMessage,
  initializeUser,
}
