
import { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  fetchChat: Store.getFetchChat(actions.getChat),
})

export default (userID = '', nextToken = '') => {
  const { subscribeToMore, data: chatsData } = useQuery(Store.ListChats, { variables: { userID } } )
  const [ getChat, { data } ] = useLazyQuery(Store.GetChat)

  useEffect(() => {
    subscribeToMore(Store.onAddChat(userID))
    subscribeToMore(Store.onEditChat(userID))
    subscribeToMore(Store.onRemoveChat(userID))
  }, [userID, subscribeToMore])

  const chats = chatsData?.listChats?.items || []
  const chatActions = getActions({ getChat })
  return [chats, chatActions]
}
