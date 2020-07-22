
import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  fetchChats: Store.getFetchUserChats(actions.removeChatMember),
  removeChat: Store.getRemoveChatMember(actions.removeChatMember),
})

export default (userID = '', nextToken = '') => {
  const [removeChatMember] = useMutation(Store.DeleteChatMember)
  const { subscribeToMore, data: user } = useQuery(Store.GetUser, {variables: { id: userID }} )

  useEffect(() => {
    subscribeToMore(Store.onAddChatMember(userID))
    subscribeToMore(Store.onEditChatMember(userID))
    subscribeToMore(Store.onRemoveChatMember(userID))
  }, [userID, subscribeToMore])

  console.log({userID, user})

  const chats = user?.getUser?.chats?.items || []
  const chatActions = getActions({ removeChatMember })
  return [chats, chatActions]
}
