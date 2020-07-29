
import { useEffect } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

const PROVIDERS = 'PROVIDERS'
export const getActions = (actions) => ({
  editUser: Store.getEditUser(actions.updateUser),
  disableUser: Store.getEditUser(actions.updateUser),
  searchUser: Store.getSearchUser(actions.searchUsers, PROVIDERS),
})

export default (id, nextToken = '') => {
  const [updateUser] = useMutation(Store.UpdateUser)
  const [searchUsers, { data: searchData }] = useLazyQuery(Store.SearchUsers)
  const { subscribeToMore, data: userData } = useQuery(Store.GetUser, { variables: { id } } )


  useEffect(() => {
    if (userData) {
      subscribeToMore(Store.onEditUser(id))
    }
  }, [id, userData, subscribeToMore])


  const user = {
    search: searchData?.searchUsers?.items || [],
    ...(userData?.getUser || {}) }
  const userActions = getActions({ updateUser, searchUsers })
  return [user, userActions]
}
