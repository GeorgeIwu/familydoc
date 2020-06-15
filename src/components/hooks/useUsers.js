
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import {listUsers, listChats} from '../graphql/queries'
import {createUser, createChat, createMessage, createChatMember} from '../graphql/mutations'
import {createdUser, createdChat, createdMessage, createdChatMember, updater, TYPE} from '../utils'

const ListUsers = gql(listUsers);
const ListChats = gql(listChats);
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)

const usersActions = (owner, actions) => {
  const { getUsers = () => {}, createUser = () => {}, createChat = () => {}, createMessage = () => {}, createChatMember } = actions

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
    await createMessage({
      variables: { input: messageInput },
      context: { serializationKey: 'CREATE_MESSAGE' },
      optimisticResponse: createdMessage(messageInput, chatData.createChat),
      update: updater(TYPE.createMessage, { query: ListChats, variables: { owner } }),
    })

    const memberInput = { chatID: chatData.createChat.id, memberID: data.createUser.id, createdAt: new Date() }
    return await createChatMember({
      variables: { input: memberInput },
      context: { serializationKey: 'CREATE_MEMBER' },
      optimisticResponse: createdChatMember(chatData.createChat, data.createUser),
      update: updater(TYPE.createChatMember, { query: ListChats, variables: { owner } }),
    })
  }

  const searchUser = debounce(async (name) => {
    const filter = {
      or: [
        { given_name: { contains: `${name}` } },
        { family_name: { contains: `${name}`} },
        { username: { contains: `${name}`} },
        { email: { contains: `${name}`} },
      ]
    }
    return getUsers({
      variables: { filter },
      // context: { serializationKey: 'SEARCH_USER' },
      // optimisticResponse: null,
      // update: updater(TYPE.updateUser, { query: ListUsers, variables: { owner } }),
    })
  }, 250)

  return {addUser, searchUser}
}

const useUsers = (owner) => {
  const [users, setUsers] = useState({items: []})
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createChatMember] = useMutation(CreateChatMember)
  const [getUsers, { loading, data }] = useLazyQuery(ListUsers)
  const [createMessage, { data: newMessage }] = useMutation(CreateMessage)

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.listUsers)
    }
  }, [loading, data])

  const allusers =  {...users, newMessage}
  const actions =  usersActions(owner, { getUsers, createUser, createChat, createMessage, createChatMember })
  return [allusers, actions]
}

export {usersActions, useUsers}
