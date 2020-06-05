
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {initialAuthState, authActions, authReducer, chatActions, chatsActions} from './'
import {getUser} from '../graphql/queries'
import {createUser, updateUser, createChat, createMessage} from '../graphql/mutations'
import {onCreateUser, onUpdateUser} from '../graphql/subscriptions'
import {updater, subscriber, createdUser, updatedUser, TYPE} from '../utils'

const GetUser = gql(getUser);
const CreateUser = gql(createUser)
const UpdateUser = gql(updateUser)
const OnCreateUser = gql(onCreateUser);
const OnUpdateUser = gql(onUpdateUser);
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)

const initializeUser = async (attributes, actions, createChat, createMessage) => {
  if (!attributes) return null
  console.log({attributes})
  const user = await actions.addUser(attributes)
  console.log({user: user.data.createUser})
  const chat = await chatsActions(user.data.createUser.id, {createChat}).addChat({name: 'Bot Man'})
  console.log({chat: chat.data.createChat})
  const message = await chatActions(user.id, chat.data.createChat, {createMessage}).addMessage({text: 'Welcome', type: 'DRUG'})
  console.log({message})

  return user
}

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

const useUser = () => {
  const [user, setUser] = useState({})
  const [createUser] = useMutation(CreateUser)
  const [updateUser] = useMutation(UpdateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMessage] = useMutation(CreateMessage)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: auth.data && auth.data.attributes.sub }})

  const owner = user.id

  useEffect(() => {
    subscribeToMore({document: OnCreateUser, variables: { owner }, updateQuery: subscriber(TYPE.onCreateUser)})
    subscribeToMore({document: OnUpdateUser, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateUser)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (!loading && data.id) {
      setUser(data.getUser)
    }
  }, [loading, data])

  useEffect(() => {
    (async function() {
      if (!loading && data.getUser) {
        setUser(data.getUser)
      }
      if (!loading && !data.getUser && auth.data.attributes) {
        const newuser = await initializeUser(auth.data.attributes, actions, createChat, createMessage)
        setUser(newuser.data.createUser)
      }
      })();
  }, [loading, data, auth]);

  const userState = { ...user, status: auth.data && auth.data.attributes ? 'active' : auth.data }
  const actions =  { ...userActions(owner, { createUser, updateUser }), ...authActions(dispatch) }

  return [userState, actions]
}

export {userActions, useUser}
