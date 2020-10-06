import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { getChat, listChats, searchChats } from '../_lib/graphql/queries'
import { onCreateChat, onUpdateChat, onDeleteChat } from '../_lib/graphql/subscriptions'
import { getUpdater, getSubscriber, updateStoreChats } from '../_lib/utils'

export const GetChat = gql(getChat);
export const ListChats = gql(listChats)
export const SearchChats = gql(searchChats)
export const OnCreateChat = gql(onCreateChat);
export const OnUpdateChat = gql(onUpdateChat);
export const OnDeleteChat = gql(onDeleteChat);

const getChatFilter = (name) => ({
  name: { contains: `${name}` },
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

export const getSearchChat = (searchUsers) => debounce(async (name) => {
  return await searchUsers({
    variables: { filter: getChatFilter(name) },
    context: { serializationKey: 'LIST_USERS' },
  })
}, 100)

export const onAddChat = (userID) => ({ document: OnCreateChat, variables: { userID }, updateQuery: getSubscriber(updateStoreChats) })
export const onEditChat = (userID) => ({ document: OnUpdateChat, variables: { userID }, updateQuery: getSubscriber(updateStoreChats) })
export const onRemoveChat = (userID) => ({ document: OnDeleteChat, variables: { userID }, updateQuery: getSubscriber(updateStoreChats) })
