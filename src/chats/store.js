import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getChat, listChats } from '../_lib/graphql/queries'
import { onCreateChat, onUpdateChat, onDeleteChat } from '../_lib/graphql/subscriptions'
import { buildSchema, getUpdater, getSubscriber, updateStoreChats } from '../_lib/utils'

export const GetChat = gql(getChat);
export const ListChats = gql(listChats)
export const OnCreateChat = gql(onCreateChat);
export const OnUpdateChat = gql(onUpdateChat);
export const OnDeleteChat = gql(onDeleteChat);

const TYPES = {
  Chat: 'Chat',
  getChat: 'getChat',
  listChats: 'listChats',
}

const getChatInput = ({ id, name, owner, createdAt, updatedAt, user }) => ({
  id: id || uuid(),
  name: name || user.given_name,
  owner: owner || user.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

export const getFetchChat = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_USER' },
    update: getUpdater(updateStoreChats, { query: GetChat, variables: { id } }),
  })
}

export const getFetchChats = (listChats) => async (userID) => {
  return await listChats({
    variables: { userID },
    context: { serializationKey: 'GET_USER' },
    update: getUpdater(updateStoreChats, { query: ListChats, variables: { userID } }),
  })
}

export const onAddChat = (userID) => ({ document: OnCreateChat, variables: { userID }, updateQuery: getSubscriber(updateStoreChats) })
export const onEditChat = (userID) => ({ document: OnUpdateChat, variables: { userID }, updateQuery: getSubscriber(updateStoreChats) })
export const onRemoveChat = (userID) => ({ document: OnDeleteChat, variables: { userID }, updateQuery: getSubscriber(updateStoreChats) })
