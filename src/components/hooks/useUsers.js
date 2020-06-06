
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import {listUsers} from '../graphql/queries'
import {createUser, createChat, createMessage} from '../graphql/mutations'
import {initializer} from '../utils'

const ListUsers = gql(listUsers);
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)

const usersActions = (owner, actions) => {
  const { getUser = () => {}, createUser = () => {}, createChat = () => {}, createMessage = () => {}  } = actions

  const initUser = async ({ email, family_name, given_name, phone_number  }) => {
   const input = { email, username: email, phone_number, family_name, given_name, type: 'USER', createdAt: new Date(), updatedAt: new Date() }

   initializer(input, createUser, createChat, createMessage, owner)
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

  return {initUser, searchUser}
}

const useUsers = (owner) => {
  const [users, setUsers] = useState({items: []})
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMessage, { data: newMessage }] = useMutation(CreateMessage)
  const [getUser, { loading, data }] = useLazyQuery(ListUsers);

  useEffect(() => {
    console.log({newMessage})
    if (newMessage) {
      setUsers({items: []})
    }
  }, [newMessage])

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.listUsers)
    }
  }, [loading, data])

  const actions =  usersActions(owner, { getUser, createUser, createChat, createMessage })

  return [users, actions]
}

export {usersActions, useUsers}
