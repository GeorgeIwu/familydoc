
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions, chat) => ({
  addMessage: Store.getAddMessage(actions.createMessage, chat),
  editMessage: Store.getEditMessage(actions.updateMessage, chat),
  removeMessage: Store.getRemoveMessage(actions.deleteMessage, chat),
})

export default (chatId = '', nextToken = '') => {
  const [createMessage] = useMutation(Store.CreateMessage)
  const [updateMessage] = useMutation(Store.UpdateMessage)
  const [deleteMessage] = useMutation(Store.DeleteMessage)
  const { subscribeToMore, data: chat } = useQuery(Store.GetChat, {variables: { id: chatId }} )

  useEffect(() => {
    subscribeToMore(Store.onAddMessage(chat?.owner))
    subscribeToMore(Store.onEditMessage(chat?.owner))
    subscribeToMore(Store.onRemoveMessage(chat?.owner))
  }, [chat, subscribeToMore])

  const messageData = chat?.getChat?.messages
  const messageActions = getActions({ createMessage, updateMessage, deleteMessage }, chat?.getChat)
  return [messageData, messageActions]
}
