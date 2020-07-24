
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions, chat) => ({
  addMember: Store.getAddChatMember(actions.createChatMember, chat),
  editMember: Store.getEditChatMember(actions.updateChatMember, chat),
  removeMember: Store.getRemoveChatMember(actions.deleteChatMember, chat),
})

export default (chatId = '', nextToken = '') => {
  const [createChatMember] = useMutation(Store.CreateChatMember)
  const [updateChatMember] = useMutation(Store.UpdateChatMember)
  const [deleteChatMember] = useMutation(Store.DeleteChatMember)
  const { subscribeToMore, data: chat } = useQuery(Store.GetChat, {variables: { id: chatId }} )

  useEffect(() => {
    subscribeToMore(Store.onAddChatMember(chat?.owner))
    subscribeToMore(Store.onEditChatMember(chat?.owner))
    subscribeToMore(Store.onRemoveChatMember(chat?.owner))
  }, [chat, subscribeToMore])

  const chatMemberData = chat?.getChat?.members?.items || []
  const chatMemberActions = getActions({ createChatMember, updateChatMember, deleteChatMember }, chat?.getChat)
  return [chatMemberData, chatMemberActions]
}
