import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { listMembers } from '../_lib/graphql/queries'
import { createMember, updateMember, deleteMember } from '../_lib/graphql/mutations'
import { onCreateMember, onUpdateMember, onDeleteMember } from '../_lib/graphql/subscriptions'
import { buildSchema, getSubscriber, getUpdater, updateStoreMembers } from '../_lib/utils'

export const ListMembers = gql(listMembers);
export const CreateMember = gql(createMember)
export const UpdateMember = gql(updateMember)
export const DeleteMember = gql(deleteMember)

const OnCreateMember = gql(onCreateMember)
const OnUpdateMember = gql(onUpdateMember)
const OnDeleteMember = gql(onDeleteMember)

const TYPES = {
  listMembers: 'listMembers',
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

export const getFetchMembers = (getChat) => async (chatID) => {
  return await getChat({
    variables: { chatID },
    context: { serializationKey: 'GET_CHAT_MEMBERS' },
    update: getUpdater(updateStoreMembers, { query: ListMembers, variables: { chatID } }),
  })
}

export const getAddMember = (createMember, chatID) => async (user) => {
  const memberInput = getMemberInput({chatID, user})
  return await createMember({
    variables: { input: memberInput },
    context: { serializationKey: 'CREATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.createMember, { member: user }),
    update: getUpdater(updateStoreMembers, { query: ListMembers, variables: { chatID  } }),
  })
}

export const getEditMember = (updateMember, chatID) => async (member) => {
  const memberInput = getMemberInput({ chatID, ...member })
  return await updateMember({
    variables: { input: memberInput },
    context: { serializationKey: 'UPDATE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.updateMember),
    update: getUpdater(updateStoreMembers, { query: ListMembers, variables: { chatID  } }),
  })
}

export const getRemoveMember = (deleteMember, chatID) => async (member) => {
  const memberInput = getMemberInput({ chatID, ...member })
  return await deleteMember({
    variables: { input: { id: memberInput.id } },
    context: { serializationKey: 'DELETE_CHAT_MEMBER' },
    optimisticResponse: buildSchema(memberInput, TYPES.Member, TYPES.deleteMember),
    update: getUpdater(updateStoreMembers, { query: ListMembers, variables: { chatID  } }),
  })
}

export const onAddMember = (chatID) => ({ document: OnCreateMember, variables: { chatID }, updateQuery: getSubscriber(updateStoreMembers) })
export const onEditMember = (chatID) => ({ document: OnUpdateMember, variables: { chatID }, updateQuery: getSubscriber(updateStoreMembers) })
export const onRemoveMember = (chatID) => ({ document: OnDeleteMember, variables: { chatID }, updateQuery: getSubscriber(updateStoreMembers) })
