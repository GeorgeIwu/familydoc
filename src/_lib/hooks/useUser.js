
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import {getUser} from '../graphql/queries'
import {updateUser} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'
import {initialAuthState, authActions, authReducer} from '.'

const GetUser = gql(getUser);
const UpdateUser = gql(updateUser)

const getUserActions = (actions) => ({
  ...actions.getAuthUser,
  editUser: Actions.getEditUser(actions.updateUser),
  disableUser: Actions.getEditUser(actions.updateUser),
  logoutUser: () => actions.getAuthUser.logout(actions.setUser),
})

const useUser = (init = {}, chatPage = '') => {
  const [user, setUser] = useState(init)
  const [updateUser] = useMutation(UpdateUser)
  const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
  const [getUser, { loading, data, subscribeToMore }] = useLazyQuery(GetUser)
  const id = auth?.data?.attributes?.sub

  useEffect(() => {
    if (id) {
      getUser({variables: { id }})
    }
  }, [id, getUser])

  useEffect(() => {
    if (data?.getUser?.id) {
      setUser(data.getUser)
    }
  }, [data])

  // useEffect(() => {
  //   //  subscribeToMore(Actions.updateAddUser())
  // }, [user, subscribeToMore])

  useEffect(() => {
    (async function() {
      if (id && !loading && data && !data.getUser) {
        await Actions.initializeUser(auth.data.attributes)
        getUser({variables: { id }})
      }
    })();
  }, [id, loading, data]);

  const status = auth?.data?.attributes ? 'active' : auth.data
  const userData = { ...user, loading, status }
  const getAuthUser = authActions(dispatch)
  const userActions =  getUserActions({ updateUser, setUser, getAuthUser })

  return [userData, userActions]
}

export {getUserActions, useUser}
