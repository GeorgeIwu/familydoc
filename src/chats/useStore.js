
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  fetchChats: Store.getFetchUserChats(actions.removeChat),
  removeChat: Store.getRemoveChat(actions.removeChat),
})

export default (userID = '', nextToken = '') => {
  const [removeChat] = useMutation(Store.DeleteChat)
  const { subscribeToMore, data: user } = useQuery(Store.GetUser, {variables: { id: userID }} )

  useEffect(() => {
    subscribeToMore(Store.onAddChatMember(userID))
    subscribeToMore(Store.onEditChatMember(userID))
    subscribeToMore(Store.onRemoveChatMember(userID))
  }, [userID, subscribeToMore])

  const chats = user.getUser?.chats
  const chatActions = getActions({ removeChat })
  return [chats, chatActions]
}
