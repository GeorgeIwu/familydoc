import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { listMessages } from '../_lib/graphql/queries'
import { createMessage, updateMessage, deleteMessage } from '../_lib/graphql/mutations'
import { onCreateMessage, onUpdateMessage, onDeleteMessage } from '../_lib/graphql/subscriptions'
import { buildSchema, getUpdater, getSubscriber, updateStoreMessages } from '../_lib/utils'

export const ListMessages = gql(listMessages)
export const CreateMessage = gql(createMessage)
export const UpdateMessage = gql(updateMessage)
export const DeleteMessage = gql(deleteMessage)

const OnCreateMessage = gql(onCreateMessage)
const OnUpdateMessage = gql(onUpdateMessage)
const OnDeleteMessage = gql(onDeleteMessage)

const TYPES = {
  getChat: 'getChat',
  Message: 'Message',
  createMessage: 'createMessage',
  updateMessage: 'updateMessage',
  deleteMessage: 'deleteMessage',
}

const getMessageInput = ({ id, chatID, text, owner, type, createdAt, updatedAt, chat }) => ({
  id: id || uuid(),
  type: type || 'ALL',
  text: text || 'Welcome',
  owner: owner || chat.owner,
  chatID: chatID || chat.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export const getFetchMessages = (getChat) => async (chatID) => {
  return await getChat({
    variables: { chatID },
    context: { serializationKey: 'GET_MESSAGES' },
    update: getUpdater(updateStoreMessages, { query: ListMessages, variables: { chatID } }),
  })
}

export const getAddMessage = (createMessage, chatID) => async (params) => {
  const messageInput = getMessageInput({ ...params, chatID })
  return await createMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'CREATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.createMessage),
    update: getUpdater(updateStoreMessages, { query: ListMessages, variables: { chatID } })
  })
}

export const getEditMessage = (updateMessage, chatID) => async (message) => {
  const messageInput = getMessageInput({ ...message, chatID })
  return await updateMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.updateMessage),
    update: getUpdater(updateStoreMessages, { query: ListMessages, variables: { chatID } }),
  })
}

export const getRemoveMessage = (deleteMessage, chatID) => async (message) => {
  const messageInput = getMessageInput({ ...message, chatID })
  return await deleteMessage({
    variables: { input: { id: messageInput.id } },
    context: { serializationKey: 'DELETE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.deleteMessage),
    update: getUpdater(updateStoreMessages, { query: ListMessages, variables: { chatID } }),
  })
}

export const onAddMessage = (chatID) => ({ document: OnCreateMessage, variables: { chatID }, updateQuery: getSubscriber(updateStoreMessages) })
export const onEditMessage = (chatID) => ({ document: OnUpdateMessage, variables: { chatID }, updateQuery: getSubscriber(updateStoreMessages) })
export const onRemoveMessage = (chatID) => ({ document: OnDeleteMessage, variables: { chatID }, updateQuery: getSubscriber(updateStoreMessages) })
