import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getUser } from '../_lib/graphql/queries'
import { updateUser } from '../_lib/graphql/mutations'
import { onUpdateUser } from '../_lib/graphql/subscriptions'
import { buildSchema, getSubscriber, getUpdater, updateStoreUsers } from '../_lib/utils'

export const GetUser = gql(getUser)
export const UpdateUser = gql(updateUser)

const OnUpdateUser = gql(onUpdateUser)

const TYPES = {
  User: 'User',
  getUser: 'getUser',
  updateUser: 'updateUser',
}

const getUserInput = ({ id, sub, email, username, phone_number, family_name, given_name, nickname = 'RECEIVER', type, createdAt, updatedAt }) => ({
  email,
  given_name,
  family_name,
  phone_number,
  type: type || nickname,
  id:  id || sub || uuid(),
  username: username || email,
  createdAt: createdAt || new Date(),
  updatedAt: updatedAt || new Date(),
})


export const getEditUser = (updateUser) => async (params) => {
  const userInput = getUserInput(params)
  return await updateUser({
    variables: { input: userInput },
    context: { serializationKey: 'UPDATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPES.User, TYPES.createUser),
    update: getUpdater(updateStoreUsers, { query: GetUser, variables: { id: params.id  } })
  })
}

export const onEditUser = (id) => ({ document: OnUpdateUser, variables: { id }, updateQuery: getSubscriber(updateStoreUsers) })
