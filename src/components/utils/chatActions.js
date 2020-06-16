import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import {getChat, listChats} from '../graphql/queries'
const GetChat = gql(getChat);
const ListChats = gql(listChats);

const subscriber = (dataType, ActionType) => (store, { subscriptionData }) => {
  const oldData = store

  const item = subscriptionData.data[dataType]
  const action = actions[ActionType || dataType]
  const newData = action(oldData, item)

  return newData
}

const updater = ({query, variables}, dataType, ActionType) => (store, { data }) => {
  const oldData = store.readQuery({ query, variables })

  const item = data[dataType]
  const action = actions[ActionType || dataType]
  const newData = action(oldData, item)

  return store.writeQuery({ query, variables, data: newData })
}

const saveChats = (store, chats) => {
  let newStore = {...store}

  if (!newStore.listChats) {
    newStore = { ...newStore, listChats: chats }
  } else {
    newStore = [ ...chats, ...newStore.listChats.items ]
  }
  return newStore
}

const saveChat = (store, chat) => {
  let newStore = {...store}

  if (!newStore.getChat) {
    newStore = { ...newStore, getChat: chat }
  } else {
    newStore.getChat = { ...newStore.getChat, ...chat }
  }
  return newStore
}

const saveChatsItem = (store, chat) => {
  let newStore = saveChat(store, chat)

  const itemIndex = newStore.listChats.items.findIndex(item => item.id === chat.id)
  if (itemIndex === -1) {
    newStore.listChats.items = [chat, ...newStore.listChats.items]
  } else {
    newStore.listChats.items[itemIndex] = chat
  }
  return newStore
}

const saveMessages = (store, messages) => {
  let newStore = {...store}

  if (!newStore.getChat.messages) {
    newStore.getChat = { ...newStore.getChat, messages }
  } else {
    newStore.getChat.messages = [ ...messages, ...newStore.getChat.messages ]
  }
  return newStore
}

const saveMessage = (store, message) => {
  let newStore = {...store}

  if (!newStore.getChat.messages) {
    newStore.getChat = { ...newStore.getChat, messages: [message] }
  } else {
    newStore.getChat.messages = [ message, ...newStore.getChat.messages ]
  }
  return newStore
}

const purgeMessage = (store, message) => {
  let newStore = {...store}

  const itemIndex = newStore.getChat.messages.items.findIndex(item => item.id === message.id)
  if (itemIndex !== -1) {
    newStore.getChat.messages.items.splice(itemIndex, 1)
  }
  return newStore
}

const saveMedicals = (store, medicals) => {
  let newStore = {...store}

  if (!newStore.getChat.medicals) {
    newStore.getChat = { ...newStore.getChat, medicals }
  } else {
    newStore.getChat.medicals = [ ...medicals, ...newStore.getChat.medicals ]
  }
  return newStore
}

const saveMedical = (store, medical) => {
  let newStore = {...store}

  if (!newStore.getChat.medical) {
    newStore.getChat = { ...newStore.getChat, medicals: [medical] }
  } else {
    newStore.getChat.medicals = [ medical, ...newStore.getChat.medicals ]
  }
  return newStore
}

const purgeMedical = (store, medical) => {
  let newStore = {...store}

  const itemIndex = newStore.getChat.medicals.items.findIndex(item => item.id === medical.id)
  if (itemIndex !== -1) {
    newStore.getChat.medicals.items.splice(itemIndex, 1)
  }
  return newStore
}

const saveMembers = (store, members) => {
  let newStore = {...store}

  if (!newStore.getChat.members) {
    newStore.getChat = { ...newStore.getChat, members }
  } else {
    newStore.getChat.members = [ ...members, ...newStore.getChat.members ]
  }
  return newStore
}

const saveMember = (store, member) => {
  let newStore = {...store}

  if (!newStore.getChat.medical) {
    newStore.getChat = { ...newStore.getChat, members: [member] }
  } else {
    newStore.getChat.members = [ member, ...newStore.getChat.members ]
  }
  return newStore
}

const purgeMember = (store, member) => {
  let newStore = {...store}

  const itemIndex = newStore.getChat.members.items.findIndex(item => item.id === member.id)
  if (itemIndex !== -1) {
    newStore.getChat.members.items.splice(itemIndex, 1)
  }
  return newStore
}

const actions = {
  getChat: saveChat,
  listChats: saveChats,
  listMessages: saveMessages,
  listMedicals: saveMedicals,
  listMembers: saveMembers,
  createChat: saveChatsItem,
  updateChat: saveChat,
  onCreateChat: saveChatsItem,
  onUpdateChat: saveChat,
  createMessage: saveMessage,
  updateMessage: saveMessage,
  onCreateMessage: saveMessage,
  deleteMessage: purgeMessage,
  onUpdateMessage: saveMessage,
  onDeleteMessage: purgeMessage,
  createMedical: saveMedical,
  updateMedical: saveMedical,
  deleteMedical: purgeMedical,
  onDeleteMedical: purgeMedical,
  createChatMember: saveMember,
  updateChatMember: saveMember,
  deleteChatMember: purgeMember,
  onCreateChatMember: saveMember,
  onUpdateChatMember: saveMember,
  onDeleteChatMember: purgeMember,
}

const TYPE = {
  getChat: 'getChat',
  listChats: 'listChats',
  listMessages: 'listMessages',
  listMedicals: 'listMedicals',
  listMembers: 'listMembers',
  createChat: 'createChat',
  updateChat: 'updateChat',
  onCreateChat: 'onCreateChat',
  onUpdateChat: 'onUpdateChat',
  createMessage: 'createMessage',
  deleteMessage: 'deleteMessage',
  updateMessage: 'updateMessage',
  onCreateMessage: 'onCreateMessage',
  onUpdateMessage: 'onUpdateMessage',
  onDeleteMessage: 'onDeleteMessage',
  createMedical: 'createMedical',
  updateMedical: 'updateMedical',
  deleteMedical: 'deleteMedical',
  onDeleteMedical: 'onDeleteMedical',
  createChatMember: 'createChatMember',
  updateChatMember: 'updateChatMember',
  deleteChatMember: 'deleteChatMember',
  onCreateChatMember: 'onCreateChatMember',
  onUpdateChatMember: 'onUpdateChatMember',
  onDeleteChatMember: 'onDeleteChatMember',
}

export const getChatSchema = ({ id, name, owner, createdAt, updatedAt }) => ({
  __typename: "Mutation",
  createChat: {
    __typename: "Chat",
    id: id || uuid(),
    messages: {},
    members: {},
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    name, owner
  }
})

export const getMessageSchema = ({ id, text, owner, type, createdAt, updatedAt }, chat) => ({
  __typename: "Mutation",
  createMessage: {
    __typename: "Message",
    id: id || uuid(),
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    chat, owner, text, type,
  }
})

export const getMemberSchema = ({ id , createdAt, updatedAt }, chat, user) => ({
  __typename: "Mutation",
  createChatMember: {
    __typename: "ChatMember",
    id: id || uuid(),
    chat,
    member: user,
    chatID: chat.id,
    memberID: user.id,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
  }
})

export const updateAddChat = subscriber(TYPE.onCreateChat)
export const updateEditChat = subscriber(TYPE.onUpdateChat)
export const updateAddMessage = subscriber(TYPE.onCreateMessage)
export const updateEditMessage = subscriber(TYPE.onUpdateMessage)
export const updateRemoveMessage = subscriber(TYPE.onDeleteMessage)
export const updateRemoveMedical = subscriber(TYPE.onDeleteMessage, TYPE.deleteMedical)
export const updateAddMember = subscriber(TYPE.onCreateChatMember)
export const updateEditMember = subscriber(TYPE.onUpdateChatMember)
export const updateRemoveMember = subscriber(TYPE.onUpdateChatMember)

export const getFetchChats = (listChats, owner) => async () => {
  return await listChats({
    variables: { owner },
    context: { serializationKey: 'LIST_CHATS' },
    optimisticResponse: null,
    update: updater({ query: ListChats, variables: { owner } }, TYPE.listChats),
  })
}

export const getFetchChat = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_CHAT' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat),
  })
}

export const getFetchMessages = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_MESSAGES' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMessages),
  })
}

export const getFetchMedicals = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_MEDICALS' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMedicals),
  })
}

export const getFetchMembers = (getChat) => async (id) => {
  return await getChat({
    variables: { id },
    context: { serializationKey: 'GET_MEMBERS' },
    optimisticResponse: null,
    update: updater({ query: GetChat, variables: { id } }, TYPE.getChat, TYPE.listMembers),
  })
}

export const getAddChat = (createChat, chat, owner) => async (user) => {
  const input = { owner, name: user.given_name, createdAt: new Date(), updatedAt: new Date() }
  return await createChat({
    variables: { input },
    context: { serializationKey: 'CREATE_CHAT' },
    optimisticResponse: getChatSchema(input, chat),
    update: updater({ query: ListChats, variables: { owner } }, TYPE.createChat),
  })
}

export const getAddMessage = (createMessage, chat, owner) => async ({ text, type }) => {
  const input = { text, messageChatId: chat.id, type, owner, createdAt: new Date(), updatedAt: new Date() }
  return await createMessage({
    variables: { input },
    context: { serializationKey: 'CREATE_MESSAGE' },
    optimisticResponse: getMessageSchema(input, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createMessage),
  })
}

export const getEditMessage = (updateMessage, chat, owner) => async ({ __typename, ...rest }) => {
  const input = { ...rest, messageChatId: chat.id, updatedAt: new Date() }
  return await updateMessage({
    variables: { input },
    context: { serializationKey: 'UPDATE_MESSAGE' },
    optimisticResponse: getMessageSchema(input, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateMessage),
  })
}

export const getRemoveMessage = (deleteMessage, chat, owner) => async (message) => {
  const input = { id: message.id }
  return await deleteMessage({
    variables: { input },
    context: { serializationKey: 'DELETE_MESSAGE' },
    optimisticResponse: getMessageSchema(message, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage),
  })
}

export const getRemoveMedical = (deleteMessage, chat, owner) => async (message) => {
  const input = { id: message.id }
  return await deleteMessage({
    variables: { input },
    context: { serializationKey: 'DELETE_MEDICAL' },
    optimisticResponse: getMessageSchema(message, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteMessage, TYPE.deleteMedical),
  })
}

export const getAddMember = (createChatMember, chat, owner) => async (user) => {
  const input = { chatID: chat.id, memberID: user.id, createdAt: new Date() }
  return await createChatMember({
    variables: { input },
    context: { serializationKey: 'CREATE_MEMBER' },
    optimisticResponse: getMemberSchema(chat, user),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.createChatMember),
  })
}

export const getEditMember = (updateChatMember, chat, owner) => async (member) => {
  const input = { ...member }
  return await updateChatMember({
    variables: { input },
    context: { serializationKey: 'CREATE_MEMBER' },
    optimisticResponse: getMemberSchema(member, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.updateChatMember),
  })
}

export const getRemoveMember = (deleteChatMember, chat, owner) => async (member) => {
  const input = { id: member.id }
  return await deleteChatMember({
    variables: { input },
    context: { serializationKey: 'DELETE_MEMBER' },
    optimisticResponse: getMemberSchema(member, chat),
    update: updater({ query: GetChat, variables: { id: chat.id } }, TYPE.deleteChatMember),
  })
}
