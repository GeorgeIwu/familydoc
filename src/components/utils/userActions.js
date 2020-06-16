import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser, listUsers } from '../graphql/queries'
import { createUser, createChat, createMessage, createChatMember } from '../graphql/mutations'
import { getChatSchema, getMessageSchema, getMemberSchema } from './chatActions'

const GetUser = gql(getUser)
const ListUsers = gql(listUsers)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)

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

const saveUsers = (store, users) => {
  let newStore = {...store}

  if (!newStore.listUsers) {
    newStore = { ...newStore, listUsers: users }
  } else {
    newStore = [ ...users, ...newStore.listUsers.items ]
  }
  return newStore
}

const saveUser = (store, user) => {
  let newStore = {...store}

  if (!newStore.getUser) {
    newStore = { ...newStore, getUser: user }
  } else {
    newStore.getUser = { ...newStore.getUser, ...user }
  }
  return newStore
}

const saveUsersItem = (store, user) => {
  let newStore = saveUser(store, user)

  const itemIndex = newStore.listUsers.items.findIndex(item => item.id === user.id)
  if (itemIndex === -1) {
    newStore.listUsers.items = [user, ...newStore.listUsers.items]
  } else {
    newStore.listUsers.items[itemIndex] = user
  }
  return newStore
}


const actions = {
  getUser: saveUser,
  listUsers: saveUsers,
  createUser: saveUsersItem,
  updateUser: saveUser,
  onCreateUser: saveUsersItem,
  onUpdateUser: saveUser,
}

const TYPE = {
  getUser: 'getUser',
  listUsers: 'listUsers',
  createUser: 'createUser',
  updateUser: 'updateUser',
  onCreateUser: 'onCreateUser',
  onUpdateUser: 'onUpdateUser',
}

const getUserSchema = ({ id, sub, email, username, phone_number, family_name, given_name, nickname, type, createdAt, updatedAt }) => ({
  __typename: "Mutation",
  createUser: {
    __typename: "User",
    id: id || sub || uuid(),
    type: type || nickname,
    username: username || email,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    email, phone_number, family_name, given_name,
  }
})

export const updateAddUser = subscriber(TYPE.onCreateUser)
export const updateEditUser = subscriber(TYPE.onUpdateUser)

export const getFetchUsers = (listUsers, owner) => async () => {
  return await listUsers({
    variables: { owner },
    context: { serializationKey: 'LIST_USERS' },
    optimisticResponse: null,
    update: updater({ query: ListUsers, variables: { owner } }, TYPE.listUsers),
  })
}

export const getFetchUser = (getUser) => async (id) => {
  return await getUser({
    variables: { id },
    context: { serializationKey: 'GET_USER' },
    optimisticResponse: null,
    update: updater({ query: GetUser, variables: { id } }, TYPE.getUser),
  })
}

export const getAddUser = (createUser, user, owner) => async (user) => {
  const input = { owner, name: user.given_name, createdAt: new Date(), updatedAt: new Date() }
  return await createUser({
    variables: { input },
    context: { serializationKey: 'CREATE_USER' },
    optimisticResponse: getUserSchema(input, user),
    update: updater({ query: ListUsers, variables: { owner } }, TYPE.createUser),
  })
}

export const getInitUser = async (attributes) => {

  const user = await API.graphql(graphqlOperation(CreateUser, getUserSchema(attributes)))
  const chat = await API.graphql(graphqlOperation(CreateChat, getChatSchema(user.data.createUser)))
  const message = await API.graphql(graphqlOperation(CreateMessage, getMessageSchema(chat.data.createChat)))
  const member = await API.graphql(graphqlOperation(CreateChatMember, getMemberSchema(chat.data.createChat, user.data.createUser)))
  console.log({user, chat, message, member})

  return user
}
