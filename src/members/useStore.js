
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions, chat) => ({
  addMember: Store.getAddMember(actions.createMember, chat),
  editMember: Store.getEditMember(actions.updateMember, chat),
  removeMember: Store.getRemoveMember(actions.deleteMember, chat),
})

export default (chatId = '', nextToken = '') => {
  const [createMember] = useMutation(Store.CreateMember)
  const [updateMember] = useMutation(Store.UpdateMember)
  const [deleteMember] = useMutation(Store.DeleteMember)
  const { subscribeToMore, data: chat } = useQuery(Store.GetChat, {variables: { id: chatId }} )

  useEffect(() => {
    subscribeToMore(Store.onAddMember(chat?.owner))
    subscribeToMore(Store.onEditMember(chat?.owner))
    subscribeToMore(Store.onRemoveMember(chat?.owner))
  }, [chat, subscribeToMore])

  const chatMemberData = chat?.getChat?.members?.items || []
  const chatMemberActions = getActions({ createMember, updateMember, deleteMember }, chat?.getChat)
  return [chatMemberData, chatMemberActions]
}
