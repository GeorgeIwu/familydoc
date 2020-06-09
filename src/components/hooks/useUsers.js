
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import {listUsers, listChats, getChat} from '../graphql/queries'
import {createUser, createChat, createMessage} from '../graphql/mutations'
import {createdUser, createdChat, createdMessage, updater, TYPE} from '../utils'

const ListUsers = gql(listUsers);
const ListChats = gql(listChats);
const GetChat = gql(getChat)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)

const usersActions = (owner, actions) => {
  const { getUser = () => {}, createUser = () => {}, createChat = () => {}, createMessage = () => {} } = actions

  const addUser = async ({ email, family_name, given_name, phone_number  }) => {

    const input = { email, username: email, phone_number, family_name, given_name, type: 'USER', createdAt: new Date(), updatedAt: new Date() }
    const newUser = createdUser(input)
    const newChat = createdChat({ owner, name: newUser.createUser.given_name, createdAt: new Date(), updatedAt: new Date() })
    const {__typename, ...chatInput} = newChat.createChat

    await createUser({
      variables: { input },
      context: { serializationKey: 'CREATE_USER' },
      optimisticResponse: newUser,
      update: updater(TYPE.createUser, { query: ListUsers, variables: { owner } }),
    })
    await createChat({
      variables: { input: chatInput },
      context: { serializationKey: 'CREATE_CHAT' },
      optimisticResponse: newChat,
      update: updater(TYPE.createChat, { query: ListChats }),
    })
  }

  const addMessage = async (chat) => {
    const input = { text: 'Welcome', messageChatId: chat.id, type: 'ALL', owner, createdAt: new Date(), updatedAt: new Date() }

    return createMessage({
      variables: { input },
      context: { serializationKey: 'CREATE_MESSAGE' },
      optimisticResponse: createdMessage(input, chat),
      update: updater(TYPE.createMessage, { query: GetChat, variables: { id: chat.id } }),
    })
   }

  const searchUser = async (name) => {
    const input = { username: name }
    return getUser({
      variables: { input },
      // context: { serializationKey: 'SEARCH_USER' },
      // optimisticResponse: null,
      // update: updater(TYPE.updateUser, { query: ListUsers, variables: { owner } }),
    })
  }

  return {addUser, addMessage, searchUser}
}

const useUsers = (owner) => {
  const [users, setUsers] = useState({items: []})
  const [getUser, { loading, data }] = useLazyQuery(ListUsers);
  const [createUser] = useMutation(CreateUser)
  const [createChat, { data: chat }] = useMutation(CreateChat)
  const [createMessage, { data: message }] = useMutation(CreateMessage)

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.listUsers)
    }
  }, [loading, data])

  useEffect(() => {
    if (chat && chat.createChat) {
      actions.addMessage(chat.createChat)
    }
  }, [chat])

  const allusers =  {...users, message}
  const actions =  usersActions(owner, { getUser, createUser, createChat, createMessage })
  return [allusers, actions]
}

export {usersActions, useUsers}
