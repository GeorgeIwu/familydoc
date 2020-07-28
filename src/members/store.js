import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getChat } from '../_lib/graphql/queries'
import { createMember, updateMember, deleteMember } from '../_lib/graphql/mutations'
import { onCreateMember, onUpdateMember, onDeleteMember } from '../_lib/graphql/subscriptions'
import { buildSchema, getSubscriber, getUpdater, updateStoreProp, removeStoreProp } from '../_lib/utils'

export const GetChat = gql(getChat);
export const CreateMember = gql(createMember)
export const UpdateMember = gql(updateMember)
export const DeleteMember = gql(deleteMember)

const OnCreateMember = gql(onCreateMember)
const OnUpdateMember = gql(onUpdateMember)
const OnDeleteMember = gql(onDeleteMember)

const TYPES = {
  getChat: 'getChat',
  createMember: 'createMember',
  updateMember: 'updateMember',
  deleteMember: 'deleteMember',
}

const getMemberInput = ({ id, chatID, userID, status, priviledges, createdAt, updatedAt, chat, user }) => ({
  id: id || uuid(),
  chatID: chatID || chat.id,
  userID: userID || user.id,
  status: status || 'APPROVED',
  priviledges: priviledges || ['ALL'],
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})

const updateStoreMember = (store, member) => updateStoreProp(store, 'getChat', member, 'members')
const removeStoreMember = (store, member) => removeStoreProp(store, 'getChat', member, 'members')

export const getFetchMembers = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT_MEMBERS' },
    update: getUpdater(updateStoreMember, TYPES.getChat, { query: GetChat, variables: { id } }),
  })
}

export const getAddMember = (createMember, chat) => async (user) => {
  const memberInput = getMemberInput({chat, user})
  return await createMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.createMember, { member: user, chat }),
    update: getUpdater(updateStoreMember, TYPES.createMember, { query: GetChat, variables: { id: chat.id  } }),
  })
}

export const getEditMember = (updateMember, chat) => async (member) => {
  const memberInput = getMemberInput({...member, chat})
  return await updateMember({
    variables: { input: memberInput },
    context: { serializationKey: 'UPDATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.updateMember, { chat }),
    update: getUpdater(updateStoreMember, TYPES.updateMember, { query: GetChat, variables: { id: chat.id  } }),
  })
}

export const getRemoveMember = (deleteMember, chat, owner) => async (member) => {
  const memberInput = getMemberInput({...member, chat, owner})
  return await deleteMember({
    variables: { input: { id: memberInput.id } },
    context: { serializationKey: 'DELETE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.deleteMember, { chat }),
    update: getUpdater(removeStoreMember, TYPES.deleteMember, { query: GetChat, variables: { id: chat.id  } }),
  })
}

export const onAddMember = (owner) => ({ document: OnCreateMember, variables: { owner }, updateQuery: getSubscriber(updateStoreMember) })
export const onEditMember = (owner) => ({ document: OnUpdateMember, variables: { owner }, updateQuery: getSubscriber(updateStoreMember) })
export const onRemoveMember = (owner) => ({ document: OnDeleteMember, variables: { owner }, updateQuery: getSubscriber(removeStoreMember) })
