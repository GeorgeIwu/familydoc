
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import {listUsers, listChats} from '../graphql/queries'
import {createUser, createChat, createMessage} from '../graphql/mutations'
import {createdUser, createdChat, createdMessage, updater, TYPE} from '../utils'

const ListUsers = gql(listUsers);
const ListChats = gql(listChats);
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)

const usersActions = (owner, actions) => {
  const { getUsers = () => {}, createUser = () => {}, createChat = () => {}, createMessage = () => {} } = actions

  const addUser = async ({email, ...attributes}) => {

    const input = { email, username: email, ...attributes, type: 'USER', createdAt: new Date(), updatedAt: new Date() }
    const { data } = await createUser({
      variables: { input },
      context: { serializationKey: 'CREATE_USER' },
      optimisticResponse: createdUser(input),
      update: updater(TYPE.createUser, { query: ListUsers, variables: { owner } }),
    })

    const chatInput = { owner, name: data.createUser.given_name, createdAt: new Date(), updatedAt: new Date() }
    const { data: chatData } = await createChat({
      variables: { input: chatInput },
      context: { serializationKey: 'CREATE_CHAT' },
      optimisticResponse: createdChat(chatInput),
      update: updater(TYPE.createChat, { query: ListChats, variables: { owner }  }),
    })

    const messageInput = { text: 'Welcome', messageChatId: chatData.createChat.id, type: 'ALL', owner, createdAt: new Date(), updatedAt: new Date() }
    return await createMessage({
      variables: { input: messageInput },
      context: { serializationKey: 'CREATE_MESSAGE' },
      optimisticResponse: createdMessage(messageInput, chatData.createChat),
      update: updater(TYPE.createMessage, { query: ListChats, variables: { owner } }),
    })
  }

  const searchUser = async (name) => {
    const input = { username: name }
    return getUsers({
      variables: { input },
      // context: { serializationKey: 'SEARCH_USER' },
      // optimisticResponse: null,
      // update: updater(TYPE.updateUser, { query: ListUsers, variables: { owner } }),
    })
  }

  return {addUser, searchUser}
}

const useUsers = (owner) => {
  const [users, setUsers] = useState({items: []})
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [getUsers, { loading, data }] = useLazyQuery(ListUsers)
  const [createMessage, { data: newMessage }] = useMutation(CreateMessage)

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.listUsers)
    }
  }, [loading, data])

  const allusers =  {...users, newMessage}
  const actions =  usersActions(owner, { getUsers, createUser, createChat, createMessage })
  return [allusers, actions]
}

export {usersActions, useUsers}
