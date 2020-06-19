
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import {getUser, listUsers} from '../graphql/queries'
import {updateUser, createUser, createChat, createMessage, createChatMember} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'
import {initialAuthState, authActions, authReducer} from './'

const GetUser = gql(getUser);
const ListUsers = gql(listUsers);
const UpdateUser = gql(updateUser)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)

const getUserActions = (actions, owner) => ({
  addProvider: Actions.getAddProvider(actions, owner),
  addReceiver: Actions.getAddReceiver(actions, owner),
  editUser: Actions.getEditUser(actions.updateUser, owner),
  disableUser: Actions.getEditUser(actions.updateUser, owner),
  searchProviders: debounce(async (name) => Actions.getFetchUsers(actions.listProviders, owner)(name, 'PROVIDER'), 100),
  searchReceivers: debounce(async (name) => Actions.getFetchUsers(actions.listReceivers, owner)(name, 'RECEIVER'), 250),
})

const useUser = (init = {}, chatPage = '') => {
  const [user, setUser] = useState(init)
  const [updateUser] = useMutation(UpdateUser)
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMessage] = useMutation(CreateMessage)
  const [createChatMember] = useMutation(CreateChatMember)
  const [listProviders, { data: providers }] = useLazyQuery(ListUsers)
  const [listReceivers, { data: receivers }] = useLazyQuery(ListUsers)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: auth.data && auth.data.attributes && auth.data.attributes.sub }})

  console.log({providers})
  useEffect(() => {
   subscribeToMore(Actions.updateAddUser())
  }, [user, subscribeToMore])

  useEffect(() => {
    if (data?.getUser?.id) {
      setUser(data.getUser)
    }
  }, [data])

  useEffect(() => {
    (async function() {
      if (!loading && data?.getUser && auth?.data?.attributes) {
        console.log('init user')
        const newuser = await Actions.getCreateUser(auth.data.attributes)
        setUser(newuser.data.createUser)
      }
    })();
  }, [loading, data, auth]);

  const status = auth.data && auth.data.attributes ? 'active' : auth.data
  const userData = { ...user, status, providers: providers?.listUsers, receivers: receivers?.listUsers }
  const userActions =  { ...getUserActions({ listProviders, listReceivers, updateUser, createUser, createChat, createMessage, createChatMember }, user?.id), ...authActions(dispatch) }

  return [userData, userActions]
}

export {getUserActions, useUser}
