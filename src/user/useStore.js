
import { useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  editUser: Store.getEditUser(actions.updateUser),
  disableUser: Store.getEditUser(actions.updateUser),
})

export default (userID, nextToken = '') => {
  const [updateUser] = useMutation(Store.UpdateUser)
  const [getUser, { loading, data }] = useLazyQuery(Store.GetUser, {variables: { id: userID }})


  useEffect(() => {
    getUser()
  }, [userID, getUser])


  const user = data?.getUser || {}
  const userActions = getActions({ updateUser, getUser })
  return [user, userActions]
}
