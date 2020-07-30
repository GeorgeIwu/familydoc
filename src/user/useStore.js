
import { useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  editUser: Store.getEditUser(actions.updateUser),
  disableUser: Store.getEditUser(actions.updateUser),
})

export default (id, nextToken = '') => {
  const [updateUser] = useMutation(Store.UpdateUser)
  const { subscribeToMore, data: userData } = useQuery(Store.GetUser, { variables: { id } } )


  useEffect(() => {
    if (userData) {
      subscribeToMore(Store.onEditUser(id))
    }
  }, [id, userData, subscribeToMore])


  const user = userData?.getUser || {}
  const userActions = getActions({ updateUser })
  return [user, userActions]
}
