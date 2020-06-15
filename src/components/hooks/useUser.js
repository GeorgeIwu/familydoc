
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import {getUser, listUsers} from '../graphql/queries'
import {createUser, updateUser} from '../graphql/mutations'
import {onUpdateUser} from '../graphql/subscriptions'
import {updater, subscriber, initializeUser, getUserFilters, createdUser, updatedUser, TYPE} from '../utils'
import {initialAuthState, authActions, authReducer} from './'

const GetUser = gql(getUser);
const ListUsers = gql(listUsers);
const CreateUser = gql(createUser)
const UpdateUser = gql(updateUser)
const OnUpdateUser = gql(onUpdateUser);

const userActions = (owner, actions) => {
  const userUserId = owner

  const addUser = async ({email, ...attributes}) => {
    const input = { email, username: email, ...attributes, type: 'USER', createdAt: new Date(), updatedAt: new Date() }
    return await actions.createUser({
      variables: { input },
      context: { serializationKey: 'CREATE_USER' },
      optimisticResponse: createdUser(input),
      update: updater(TYPE.createUser, { query: ListUsers, variables: { owner } }),
    })
  }

  const editUser = async ({ __typename, ...rest }) => {
    const input = { ...rest }
    return await actions.updateUser({
      variables: { input },
      context: { serializationKey: 'UPDATE_USER' },
      optimisticResponse: updatedUser(input),
      update: updater(TYPE.updateUser, { query: GetUser, variables: { id: userUserId } }),
    })
  }

  const disableUser = async ({ __typename, ...rest }) => {
    const input = { ...rest }
    return await actions.updateUser({
      variables: { input },
      context: { serializationKey: 'UPDATE_USER' },
      optimisticResponse: updatedUser(input),
      update: updater(TYPE.updateUser, { query: GetUser, variables: { id: userUserId } }),
    })
  }

  const getUsers = debounce(async (name) => {
    return await actions.listUsers({
      variables: { filter: getUserFilters(name) },
      // context: { serializationKey: 'SEARCH_USER' },
      // optimisticResponse: null,
      // update: updater(TYPE.updateUser, { query: ListUsers, variables: { owner } }),
    })
  }, 250)

  return {addUser, editUser, disableUser, getUsers}
}

const useUser = (init = {}) => {
  const [user, setUser] = useState(init)
  const [updateUser] = useMutation(UpdateUser)
  const [createUser] = useMutation(CreateUser)
  const [listUsers, { data: users }] = useLazyQuery(ListUsers)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: auth.data && auth.data.attributes && auth.data.attributes.sub }})
  const owner = user?.id

  useEffect(() => {
   subscribeToMore({document: OnUpdateUser, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateUser)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (!loading && data && data.getUser && data.getUser.id) {
      console.log('got user')
      setUser(data.getUser)
    }
  }, [loading, data])

  useEffect(() => {
    (async function() {
      if (!loading && data && !data.getUser && auth.data.attributes) {
        console.log('init user')
        const newuser = await initializeUser(auth.data.attributes)
        setUser(newuser.data.createUser)
      }
    })();
  }, [loading, data, auth]);

  const status = auth.data && auth.data.attributes ? 'active' : auth.data
  const userState = { ...user, status }
  const actions =  { ...userActions(owner, { listUsers, updateUser, createUser }), ...authActions(dispatch) }

  return [userState, actions]
}

export {userActions, useUser}
