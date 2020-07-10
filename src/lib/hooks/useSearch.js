
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

const getSearchActions = (provider, actions) => ({
  addProvider: Actions.getAddProvider(actions),
  addReceiver: Actions.getAddReceiver(actions, provider),
  searchProviders: debounce(async (name) => Actions.getFetchUsers(actions.listProviders)(name, 'PROVIDER'), 100),
  searchReceivers: debounce(async (name) => Actions.getFetchUsers(actions.listReceivers)(name, 'RECEIVER'), 250),
})

const useSearch = (userId, nextToken = '') => {
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMessage] = useMutation(CreateMessage)
  const [createChatMember] = useMutation(CreateChatMember)
  const [listProviders, { data: providers }] = useLazyQuery(ListUsers)
  const [listReceivers, { data: receivers }] = useLazyQuery(ListUsers)

  const searchData = { providers: providers?.listUsers, receivers: receivers?.listUsers }
  const userActions =  getSearchActions(userId, { listProviders, listReceivers, createUser, createChat, createMessage, createChatMember })

  return [searchData, userActions]
}

export {getSearchActions, useSearch}
