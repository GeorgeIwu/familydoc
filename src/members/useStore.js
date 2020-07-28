
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
  const { subscribeToMore, data: listMembers } = useQuery(Store.ListMembers, {variables: { chatID }} )

  useEffect(() => {
    subscribeToMore(Store.onAddMember(chatID))
    subscribeToMore(Store.onEditMember(chatID))
    subscribeToMore(Store.onRemoveMember(chatID))
  }, [chatID, subscribeToMore])

  const memberData = listMembers?.listMembers?.items || []
  const memberActions = getActions({ createMember, updateMember, deleteMember }, chatID)
  return [memberData, memberActions]
}
