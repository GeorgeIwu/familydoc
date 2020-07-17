
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import {listUsers} from '../graphql/queries'
import {createUser, createChat, createMessage, createChatMember} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'

const ListUsers = gql(listUsers);
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)

const getSearchActions = (actions, userId) => ({
  addProvider: Actions.getCreateUser(actions),
  addReceiver: Actions.getCreateUser(actions, userId),
  searchUser: debounce(async (name, type = 'RECEIVER') => Actions.getFetchUsers(actions.listUsers)(name, type), 100),
})

const useSearch = (userId, nextToken = '') => {
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMessage] = useMutation(CreateMessage)
  const [createChatMember] = useMutation(CreateChatMember)
  const [listUsers, { data: users }] = useLazyQuery(ListUsers)

  const searchData = users?.listUsers
  const userActions =  getSearchActions({ listUsers, createUser, createChat, createMessage, createChatMember }, userId)

  return [searchData, userActions]
}

export {getSearchActions, useSearch}
