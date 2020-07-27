
import { useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  fetchChats: Store.getFetchUserChats(actions.removeChatMember),
  removeChat: Store.getRemoveChatMember(actions.removeChatMember),
})

export default (userID = '', nextToken = '') => {
  const [removeChatMember] = useMutation(Store.DeleteChatMember)
  const { subscribeToMore, data: chatsData } = useQuery(Store.ListChats, {variables: { userID }} )
  const [ getChat, { data: chatData } ] = useLazyQuery(Store.GetChat)

  useEffect(() => {
    subscribeToMore(Store.onAddChatMember(userID))
    subscribeToMore(Store.onEditChatMember(userID))
    subscribeToMore(Store.onRemoveChatMember(userID))
  }, [userID, subscribeToMore])

  const chats = chatsData?.listChats?.items || []
  const chatActions = getActions({ removeChatMember })
  return [chats, chatActions]
}
