
import { useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  editUser: Store.getEditUser(actions.updateUser),
  disableUser: Store.getEditUser(actions.updateUser),
  logoutUser: Store.getLogoutUser(actions.setUser),
})

export default (userID, nextToken = '') => {
  const [updateUser] = useMutation(Store.UpdateUser)
  const [getUser, { loading, data }] = useLazyQuery(Store.GetUser)

  useEffect(() => {
    getUser({variables: { id: userID }})
  }, [userID, getUser])


  const user = data.getUser
  const userActions = getActions({ updateUser, getUser })
  return [user, userActions]
}
