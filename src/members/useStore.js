
import { useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

const PROVIDER = 'USER'
export const getActions = (actions, chatID) => ({
  addMember: Store.getAddMember(actions.createMember, chatID),
  editMember: Store.getEditMember(actions.updateMember, chatID),
  removeMember: Store.getRemoveMember(actions.deleteMember, chatID),
  searchUser: Store.getSearchUser(actions.searchUsers, PROVIDER),
})

export default (chatID = '', nextToken = '') => {
  const [createMember] = useMutation(Store.CreateMember)
  const [updateMember] = useMutation(Store.UpdateMember)
  const [deleteMember] = useMutation(Store.DeleteMember)
  const [searchUsers, { data: searchData }] = useLazyQuery(Store.SearchUsers)
  const { subscribeToMore, data: membersData } = useQuery(Store.ListMembers, {variables: { chatID }} )

  useEffect(() => {
    if (membersData) {
      subscribeToMore(Store.onAddMember(chatID))
      subscribeToMore(Store.onEditMember(chatID))
      subscribeToMore(Store.onRemoveMember(chatID))
    }
  }, [chatID, membersData, subscribeToMore])

  const members = {
    items: membersData?.listMembers?.items || [],
    search: searchData?.searchUsers?.items || []
  }
  const membersActions = getActions({ createMember, updateMember, deleteMember, searchUsers }, chatID)
  return [members, membersActions]
}
