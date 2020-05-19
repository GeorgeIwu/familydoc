import { v4 as uuid } from 'uuid';

const createdMessage = ({text, owner, type, createdAt, updatedAt}, chat) => ({
  __typename: "Mutation",
  createMessage: {
    __typename: "Message",
    chat, owner, text, type, createdAt, updatedAt,
    id: uuid(),
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

const deleteMessage = (store, item) => {
  const newStore = {...store}
  const itemIndex = newStore.getChat.messages.items.findIndex(message => message.id === item.id)
  if (itemIndex !== -1) {
    newStore.getChat.messages.items.splice(itemIndex, 1)
  }
  return newStore
}

const actions = {
  createMessage,
  deleteMessage,
  updateMessage: createMessage,
  onCreateMessage: createMessage,
  onDeleteMessage: deleteMessage,
}

const TYPE = {
  createMessage: 'createMessage',
  deleteMessage: 'deleteMessage',
  updateMessage: 'updateMessage',
  onCreateMessage: 'onCreateMessage',
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
  createdMessage,
  deletedMessage,
}
