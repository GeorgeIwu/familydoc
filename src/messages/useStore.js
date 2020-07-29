
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions, chatID) => ({
  addMessage: Store.getAddMessage(actions.createMessage, chatID),
  editMessage: Store.getEditMessage(actions.updateMessage, chatID),
  removeMessage: Store.getRemoveMessage(actions.deleteMessage, chatID),
})

export default (chatID = '', nextToken = '') => {
  const [createMessage] = useMutation(Store.CreateMessage)
  const [updateMessage] = useMutation(Store.UpdateMessage)
  const [deleteMessage] = useMutation(Store.DeleteMessage)
  const { subscribeToMore, data: listMessages } = useQuery(Store.ListMessages, {variables: { chatID }} )

  useEffect(() => {
    if (listMessages && subscribeToMore) {
      subscribeToMore(Store.onAddMessage(chatID))
      subscribeToMore(Store.onEditMessage(chatID))
      subscribeToMore(Store.onRemoveMessage(chatID))
    }
  }, [chatID, listMessages, subscribeToMore])

  const messageData = listMessages?.listMessages?.items || []
  const messageActions = getActions({ createMessage, updateMessage, deleteMessage }, chatID)
  return [messageData, messageActions]
}
