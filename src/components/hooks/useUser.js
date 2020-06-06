
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {initialAuthState, authActions, authReducer} from './'
import {getUser} from '../graphql/queries'
import {updateUser} from '../graphql/mutations'
import {onUpdateUser} from '../graphql/subscriptions'
import {updater, subscriber, initializeUser, updatedUser, TYPE} from '../utils'

const GetUser = gql(getUser);
const UpdateUser = gql(updateUser)
const OnUpdateUser = gql(onUpdateUser);

const userActions = (owner, actions) => {
  const userUserId = owner
  const { updateUser = () => {} } = actions

  const editUser = async ({ __typename, ...rest }) => {
    const input = { ...rest }
    return updateUser({
      variables: { input },
      context: { serializationKey: 'UPDATE_USER' },
      optimisticResponse: updatedUser(input),
      update: updater(TYPE.updateUser, { query: GetUser, variables: { id: userUserId } }),
    })
  }

  const disableUser = async ({ __typename, ...rest }) => {
    const input = { ...rest }
    return updateUser({
      variables: { input },
      context: { serializationKey: 'UPDATE_USER' },
      optimisticResponse: updatedUser(input),
      update: updater(TYPE.updateUser, { query: GetUser, variables: { id: userUserId } }),
    })
  }

  return {editUser, disableUser}
}

const useUser = (initialState = {}) => {
  const [updateUser] = useMutation(UpdateUser)
  const [user, setUser] = useState(initialState)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: auth.data && auth.data.attributes && auth.data.attributes.sub }})

  const owner = user && user.id

  useEffect(() => {
   subscribeToMore({document: OnUpdateUser, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateUser)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (!loading && data && data.getUser && data.getUser.id) {
      setUser(data.getUser)
    }
  }, [loading, data])

  useEffect(() => {
    (async function() {
      if (!loading && data && data.getUser) {
        console.log('data', data.getUser)
        setUser(data.getUser)
      }
      if (!loading && data && !data.getUser && auth.data.attributes) {
        console.log('auth', auth.data.attributes)
        const newuser = await initializeUser(auth.data.attributes)
        setUser(newuser.data.createUser)
      }
      })();
  }, [loading, data, auth]);

  const userState = { ...user, status: auth.data && auth.data.attributes ? 'active' : auth.data }
  const actions =  { ...userActions(owner, { updateUser }), ...authActions(dispatch) }

  return [userState, actions]
}

export {userActions, useUser}
