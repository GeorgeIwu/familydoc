
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import {getUser, listUsers} from '../graphql/queries'
import {updateUser, createUser, createChat, createMessage, createChatMember} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'
import {initialAuthState, authActions, authReducer} from '.'

const GetUser = gql(getUser);
const ListUsers = gql(listUsers);
const UpdateUser = gql(updateUser)
const CreateUser = gql(createUser)
const CreateChat = gql(createChat)
const CreateMessage = gql(createMessage)
const CreateChatMember = gql(createChatMember)

const getUserActions = (provider, actions) => ({
  ...actions.authActions,
  addProvider: Actions.getAddProvider(actions),
  addReceiver: Actions.getAddReceiver(actions, provider),
  editUser: Actions.getEditUser(actions.updateUser),
  disableUser: Actions.getEditUser(actions.updateUser),
  logoutUser: async () => {
    console.log('dey')
    await actions.authActions.logout()
    actions.setUser(null)
  },
  searchProviders: debounce(async (name) => Actions.getFetchUsers(actions.listProviders)(name, 'PROVIDER'), 100),
  searchReceivers: debounce(async (name) => Actions.getFetchUsers(actions.listReceivers)(name, 'RECEIVER'), 250),
})

const useUser = (init = {}, nextToken = '') => {
  const [user, setUser] = useState(init)
  const [updateUser] = useMutation(UpdateUser)
  const [createUser] = useMutation(CreateUser)
  const [createChat] = useMutation(CreateChat)
  const [createMessage] = useMutation(CreateMessage)
  const [createChatMember] = useMutation(CreateChatMember)
  const [listProviders, { data: providers }] = useLazyQuery(ListUsers)
  const [listReceivers, { data: receivers }] = useLazyQuery(ListUsers)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: user?.id || auth?.data?.attributes?.sub }})

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
      if (auth?.data?.attributes && !loading && !data?.getUser) {
        const newuser = await Actions.getCreateUser(auth.data.attributes)
        setUser(newuser.data.createUser)
      }
    })();
  }, [loading, data, auth]);

  const status = auth.data && auth.data.attributes ? 'active' : auth.data
  const userData = { ...user, status, providers: providers?.listUsers, receivers: receivers?.listUsers }
  const userActions =  getUserActions(user?.id, { listProviders, listReceivers, updateUser, setUser, createUser, createChat, createMessage, createChatMember, authActions: authActions(dispatch) })

  return [userData, userActions]
}

export {getUserActions, useUser}
