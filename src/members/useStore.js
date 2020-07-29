
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions, chatID) => ({
  addMember: Store.getAddMember(actions.createMember, chatID),
  editMember: Store.getEditMember(actions.updateMember, chatID),
  removeMember: Store.getRemoveMember(actions.deleteMember, chatID),
})

export default (chatID = '', nextToken = '') => {
  const [createMember] = useMutation(Store.CreateMember)
  const [updateMember] = useMutation(Store.UpdateMember)
  const [deleteMember] = useMutation(Store.DeleteMember)
  const { subscribeToMore, data: membersData } = useQuery(Store.ListMembers, {variables: { chatID }} )

  useEffect(() => {
    if (membersData) {
      subscribeToMore(Store.onAddMember(chatID))
      subscribeToMore(Store.onEditMember(chatID))
      subscribeToMore(Store.onRemoveMember(chatID))
    }
  }, [chatID, membersData, subscribeToMore])

  const members = membersData?.listMembers?.items || []
  const membersActions = getActions({ createMember, updateMember, deleteMember }, chatID)
  return [members, membersActions]
}
