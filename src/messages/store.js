import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getChat } from '../_lib/graphql/queries'
import { createMessage, updateMessage, deleteMessage } from '../_lib/graphql/mutations'
import { onCreateMessage, onUpdateMessage, onDeleteMessage } from '../_lib/graphql/subscriptions'
import { buildSchema, getSubscriber, getUpdater, updateStoreProp, removeStoreProp } from '../_lib/utils'

export const GetChat = gql(getChat);
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

const getMessageInput = ({ id, messageChatId, text, owner, type, createdAt, updatedAt, chat }) => ({
  id: id || uuid(),
  type: type || 'ALL',
  text: text || 'Welcome',
  owner: owner || chat.owner,
  messageChatId: messageChatId || chat.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const updateStoreChatMessage = (store, message) => updateStoreProp(store, 'getChat', message, 'messages')
const removeStoreChatMessage = (store, message) => removeStoreProp(store, 'getChat', message, 'messages')

export const getFetchMessages = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_MESSAGES' },
    update: getUpdater(updateStoreChatMessage, TYPES.getChat, { query: GetChat, variables: { id } }),
  })
}

export const getAddMessage = (createMessage, chat, shouldUpdate = true) => async (params) => {
  const messageInput = getMessageInput({...params, chat})
  return await createMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'CREATE_MESSAGE' },
    ...(shouldUpdate && {
      optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.createMessage, { chat }),
      update: getUpdater(updateStoreChatMessage, TYPES.createMessage, { query: GetChat, variables: { id: chat.id } })
    }),
  })
}

export const getEditMessage = (updateMessage, chat) => async (message) => {
  const messageInput = getMessageInput({...message, chat})
  return await updateMessage({
    variables: { input: messageInput },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.updateMessage, { chat }),
    update: getUpdater(updateStoreChatMessage, TYPES.updateMessage, { query: GetChat, variables: { id: chat.id } }),
  })
}

export const getRemoveMessage = (deleteMessage, chat) => async (message) => {
  const messageInput = getMessageInput({...message, chat})
  return await deleteMessage({
    variables: { input: { id: messageInput.id } },
    context: { serializationKey: 'DELETE_MESSAGE' },
    optimisticResponse: buildSchema(messageInput, TYPES.Message, TYPES.deleteMessage, { chat }),
    update: getUpdater(removeStoreChatMessage, TYPES.deleteMessage, { query: GetChat, variables: { id: chat.id } }),
  })
}

export const onAddMessage = (owner) => ({ document: OnCreateMessage, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMessage) })
export const onEditMessage = (owner) => ({ document: OnUpdateMessage, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMessage) })
export const onRemoveMessage = (owner) => ({ document: OnDeleteMessage, variables: { owner }, updateQuery: getSubscriber(removeStoreChatMessage) })
