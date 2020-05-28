import { v4 as uuid } from 'uuid';

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
  createChat: 'createChat',
  updateChat: 'updateChat',
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


export {
  TYPE,
  updater,
  subscriber,
  createdChat,
  updatedChat,
  createdMessage,
  updatedMessage,
  deletedMessage,
}
