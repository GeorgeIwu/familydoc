
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import {listUsers} from '../graphql/queries'
import {createUser} from '../graphql/mutations'
import {updater, createdUser, TYPE} from '../utils'

const ListUsers = gql(listUsers);
const CreateUser = gql(createUser)

const usersActions = (owner, actions) => {
  const { createUser = () => {}, getUser = () => {} } = actions

  const initUser = async ({ email, family_name, given_name, phone_number  }) => {
   const input = { email, username: email, phone_number, family_name, given_name, type: 'USER', createdAt: new Date(), updatedAt: new Date() }

   return createUser({
      variables: { input },
      context: { serializationKey: 'CREATE_USER' },
      optimisticResponse: createdUser(input),
      update: updater(TYPE.createUser, { query: ListUsers, variables: { owner } }),
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

  return {initUser, searchUser}
}

const useUsers = (owner) => {
  const [createUser] = useMutation(CreateUser)
  const [users, setUsers] = useState({items: []})
  const [getUser, { loading, data }] = useLazyQuery(ListUsers);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.listUsers)
    }
  }, [loading, data])

  const actions =  usersActions(owner, { createUser, getUser })

  return [users, actions]
}

export {usersActions, useUsers}
