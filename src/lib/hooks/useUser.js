
import { useState, useEffect, useReducer } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getUser} from '../graphql/queries'
import {updateUser} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'
import {initialAuthState, authActions, authReducer} from '.'

const GetUser = gql(getUser);
const UpdateUser = gql(updateUser)

const getUserActions = (actions) => ({
  ...actions.authActions,
  editUser: Actions.getEditUser(actions.updateUser),
  disableUser: Actions.getEditUser(actions.updateUser),
  logoutUser: async () => {
    console.log('dey')
    await actions.authActions.logout()
    actions.setUser(null)
  }
})

const useUser = (init = {}, nextToken = '') => {
  const [user, setUser] = useState(init)
  const [updateUser] = useMutation(UpdateUser)
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

  const status = auth?.data?.attributes ? 'active' : auth.data
  const userData = { ...user, status }
  const userActions =  getUserActions({ updateUser, setUser, authActions: authActions(dispatch) })

  return [userData, userActions]
}

export {getUserActions, useUser}
