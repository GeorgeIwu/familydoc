import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getChat, listChats } from '../_lib/graphql/queries'
import { deleteChatMember } from '../_lib/graphql/mutations'
import { onCreateChatMember, onUpdateChatMember, onDeleteChatMember } from '../_lib/graphql/subscriptions'
import { buildSchema, updateStoreChats, getSubscriber, getUpdater, updateStoreProp } from '../_lib/utils'

export const GetChat = gql(getChat);
export const ListChats = gql(listChats)
export const DeleteChatMember = gql(deleteChatMember);
export const OnCreateChatMember = gql(onCreateChatMember);
export const OnUpdateChatMember = gql(onUpdateChatMember);
export const OnDeleteChatMember = gql(onDeleteChatMember);

const TYPES = {
  Chat: 'Chat',
  getChat: 'getChat',
  listChats: 'listChats',
  deleteChatMember: 'deleteChatMember',
}

const getChatInput = ({ id, name, owner, createdAt, updatedAt, user }) => ({
  id: id || uuid(),
  name: name || user.given_name,
  owner: owner || user.id,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const updateStoreUserMember = (store, member) => updateStoreProp(store, 'getUser', member, 'chats')

export const getFetchUserChats = (listChats) => async (userID) => {
  return await listChats({
    variables: { userID },
    context: { serializationKey: 'GET_USER' },
    update: getUpdater(updateStoreChats, TYPES.listChats, { query: ListChats, variables: { userID } }),
  })
}

export const getRemoveChatMember = (removeChatMember, user) => async (params) => {
  const chatInput = getChatInput({...params, user})
  return await removeChatMember({
    variables: { input: chatInput },
    context: { serializationKey: 'CREATE_CHAT' },
    optimisticResponse: buildSchema(chatInput, TYPES.Chat, TYPES.createChat),
  })
}


export const onAddChatMember = () => ({ document: OnCreateChatMember, updateQuery: getSubscriber(updateStoreUserMember) })
export const onEditChatMember = () => ({ document: OnUpdateChatMember, updateQuery: getSubscriber(updateStoreUserMember) })
export const onRemoveChatMember = () => ({ document: OnDeleteChatMember, updateQuery: getSubscriber(updateStoreUserMember) })
