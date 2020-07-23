
import { useEffect } from 'react'
import debounce from 'lodash/debounce'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  editUser: Store.getEditUser(actions.updateUser),
  disableUser: Store.getEditUser(actions.updateUser),
  searchUser: debounce(async (name, type) => Store.getSearchUser(actions.listUsers)(name, type), 100),
})

export default (userID, nextToken = '') => {
  const [updateUser] = useMutation(Store.UpdateUser)
  const [listUsers, { data: search }] = useLazyQuery(Store.ListUsers)
  const [getUser, { loading, data }] = useLazyQuery(Store.GetUser, {variables: { id: userID }})


  useEffect(() => {
    getUser()
  }, [userID, getUser])


  const user = {
    search: search.listUsers || []
    , ...data?.getUser
  }
  const userActions = getActions({ updateUser, listUsers, getUser })
  return [user, userActions]
}
