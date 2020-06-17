
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import {getUser, listUsers} from '../graphql/queries'
import {createUser, updateUser} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'
import {initialAuthState, authActions, authReducer} from './'

const GetUser = gql(getUser);
const ListUsers = gql(listUsers);
const CreateUser = gql(createUser)
const UpdateUser = gql(updateUser)

const getUserActions = (actions, owner) => ({
  editUser: Actions.getEditUser(actions.updateUser, owner),
  disableUser: Actions.getEditUser(actions.updateUser, owner),
  addReceiver: Actions.getAddUser(actions.createReceiver, owner),
  searchProviders: debounce(async (name) => Actions.getFetchUsers(actions.listProviders, owner), 250),
  searchReceivers: debounce(async (name) => Actions.getFetchUsers(actions.listReceivers, owner), 250),
})

const useUser = (init = {}, chatPage = '') => {
  const [user, setUser] = useState(init)
  const [updateUser] = useMutation(UpdateUser)
  const [createReceiver] = useMutation(CreateUser)
  const [listProviders, { data: providers }] = useLazyQuery(ListUsers)
  const [listReceivers, { data: receivers }] = useLazyQuery(ListUsers)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const { subscribeToMore, data, loading } = useQuery(GetUser, {variables: { id: auth.data && auth.data.attributes && auth.data.attributes.sub }})

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
        const newuser = await Actions.getInitUser(auth.data.attributes)
        setUser(newuser.data.createUser)
      }
    })();
  }, [loading, data, auth]);

  const status = auth.data && auth.data.attributes ? 'active' : auth.data
  const userData = { ...user, providers, receivers, status }
  const userActions =  { ...getUserActions({ listProviders, listReceivers, updateUser, createReceiver }, user?.id), ...authActions(dispatch) }

  return [userData, userActions]
}

export {getUserActions, useUser}
