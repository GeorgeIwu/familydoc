
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {initialAuthState, authActions, authReducer} from './'
import {getUser} from '../graphql/queries'
import {createUser, updateUser} from '../graphql/mutations'
import {onCreateUser, onUpdateUser} from '../graphql/subscriptions'
import {updater, subscriber, initializeUser, createdUser, updatedUser, TYPE} from '../utils'

const GetUser = gql(getUser);
const CreateUser = gql(createUser)
const UpdateUser = gql(updateUser)
const OnCreateUser = gql(onCreateUser);
const OnUpdateUser = gql(onUpdateUser);

const userActions = (owner, actions) => {
  const userUserId = owner
  const { createUser = () => {}, updateUser = () => {} } = actions

  const addUser = async ({ email, family_name, given_name, nickname, phone_number, sub  }) => {
   const input = { email, username: email, phone_number, family_name, given_name, type: nickname }
    const userResponse = createdUser(input, sub)
    return createUser({
      variables: { input },
      context: { serializationKey: 'CREATE_USER' },
      optimisticResponse: userResponse,
      update: updater(TYPE.createUser, { query: GetUser, variables: { id: userResponse.createdUser.id } }),
    })
  }

  const editUser = async ({ __typename, ...rest }) => {
    const input = { ...rest }
    return updateUser({
      variables: { input },
      context: { serializationKey: 'UPDATE_USER' },
      optimisticResponse: updatedUser(input),
      update: updater(TYPE.updateUser, { query: GetUser, variables: { id: userUserId } }),
    })
  }

  const removeUser = async ({ __typename, ...rest }) => {
    const input = { ...rest }
    return updateUser({
      variables: { input },
      context: { serializationKey: 'UPDATE_USER' },
      optimisticResponse: updatedUser(input),
      update: updater(TYPE.updateUser, { query: GetUser, variables: { id: userUserId } }),
    })
  }

  return {addUser, editUser, removeUser}
}

const useUser = (initialState = {}) => {
  const [createUser] = useMutation(CreateUser)
  const [updateUser] = useMutation(UpdateUser)
  const [user, setUser] = useState(initialState)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: auth.data && auth.data.attributes.sub }})

  const owner = user.id

  useEffect(() => {
    subscribeToMore({document: OnCreateUser, variables: { owner }, updateQuery: subscriber(TYPE.onCreateUser)})
    subscribeToMore({document: OnUpdateUser, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateUser)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (!loading && data && data.getUser.id) {
      setUser(data.getUser)
    }
  }, [loading, data])

  useEffect(() => {
    (async function() {
      if (!loading && data && data.getUser) {
        setUser(data.getUser)
      }
      if (!loading && data && !data.getUser && auth.data.attributes) {
        const newuser = await initializeUser(auth.data.attributes)
        setUser(newuser.data.createUser)
      }
      })();
  }, [loading, data, auth]);

  const userState = { ...user, status: auth.data && auth.data.attributes ? 'active' : auth.data }
  const actions =  { ...userActions(owner, { createUser, updateUser }), ...authActions(dispatch) }

  return [userState, actions]
}

export {userActions, useUser}
