import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getChat } from '../../graphql/queries'
import { createChatMember, updateChatMember, deleteChatMember } from '../../graphql/mutations'
import { onCreateChatMember, onUpdateChatMember, onDeleteChatMember } from '../../graphql/subscriptions'
import { buildSchema, getSubscriber, getUpdater, updateStoreProp, removeStoreProp } from '../../utils'

export const GetChat = gql(getChat);
export const CreateChatMember = gql(createChatMember)
export const UpdateChatMember = gql(updateChatMember)
export const DeleteChatMember = gql(deleteChatMember)

const OnCreateChatMember = gql(onCreateChatMember)
const OnUpdateChatMember = gql(onUpdateChatMember)
const OnDeleteChatMember = gql(onDeleteChatMember)

const TYPES = {
  getChat: 'getChat',
  createChatMember: 'createChatMember',
  updateChatMember: 'updateChatMember',
  deleteChatMember: 'deleteChatMember',
}

const getChatMemberInput = ({ id, chatID, memberID, status, priviledges, createdAt, updatedAt, chat, user }) => ({
  id: id || uuid(),
  chatID: chatID || chat.id,
  memberID: memberID || user.memberID || user.id,
  status: status || 'APPROVED',
  priviledges: priviledges || ['ALL'],
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const updateStoreChatMember = (store, member) => updateStoreProp(store, 'getChat', member, 'members')
const removeStoreChatMember = (store, member) => removeStoreProp(store, 'getChat', member, 'members')

export const getFetchChatMembers = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT_MEMBERS' },
    update: getUpdater(updateStoreChatMember, TYPES.getChat, { query: GetChat, variables: { id } }),
  })
}

export const getAddChatMember = (createChatMember, chat) => async (user) => {
  const memberInput = getChatMemberInput({chat, user})
  return await createChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.createChatMember, { member: user, chat }),
    update: getUpdater(updateStoreChatMember, TYPES.createChatMember, { query: GetChat, variables: { id: chat.id  } }),
  })
}

export const getEditChatMember = (updateChatMember, chat) => async (member) => {
  const memberInput = getChatMemberInput({...member, chat})
  return await updateChatMember({
    variables: { input: memberInput },
    context: { serializationKey: 'UPDATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.updateChatMember, { chat }),
    update: getUpdater(updateStoreChatMember, TYPES.updateChatMember, { query: GetChat, variables: { id: chat.id  } }),
  })
}

export const getRemoveChatMember = (deleteChatMember, chat, owner) => async (member) => {
  const memberInput = getChatMemberInput({...member, chat, owner})
  return await deleteChatMember({
    variables: { input: { id: memberInput.id } },
    context: { serializationKey: 'DELETE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.ChatMember, TYPES.deleteChatMember, { chat }),
    update: getUpdater(removeStoreChatMember, TYPES.deleteChatMember, { query: GetChat, variables: { id: chat.id  } }),
  })
}

export const updateAddChatMember = (owner) => ({ document: OnCreateChatMember, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMember) })
export const updateEditChatMember = (owner) => ({ document: OnUpdateChatMember, variables: { owner }, updateQuery: getSubscriber(updateStoreChatMember) })
export const updateRemoveChatMember = (owner) => ({ document: OnDeleteChatMember, variables: { owner }, updateQuery: getSubscriber(removeStoreChatMember) })
