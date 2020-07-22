import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag'
import { getUser } from '../../graphql/queries'
import { updateUser } from '../../graphql/mutations'
import { onUpdateUser } from '../../graphql/subscriptions'
import { buildSchema, updateStoreUser, getSubscriber, getUpdater } from '../../utils'

export const GetUser = gql(getUser)
export const UpdateUser = gql(updateUser)

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


export const getEditUser = (actions) => async (params) => {
  const userInput = getUserInput(params)
  return await actions.updateUser({
    variables: { input: userInput },
    context: { serializationKey: 'UPDATE_USER' },
    optimisticResponse: buildSchema(userInput, TYPES.User, TYPES.createUser),
    update: getUpdater(updateStoreUser, TYPES.updateUser, { query: GetUser, variables: { id: params.id  } })
  })
}

export const onEditUser = (userID) => ({ document: onUpdateUser, variables: { id: userID }, updateQuery: getSubscriber(updateStoreUser) })
